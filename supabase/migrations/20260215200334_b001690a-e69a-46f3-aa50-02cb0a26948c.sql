
-- Multi-tenant organizations table
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  plan TEXT NOT NULL DEFAULT 'starter' CHECK (plan IN ('starter', 'growth', 'enterprise')),
  monthly_app_limit INTEGER NOT NULL DEFAULT 40000,
  apps_used_this_month INTEGER NOT NULL DEFAULT 0,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Profiles table linked to auth.users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Roles table (separate as required)
CREATE TYPE public.app_role AS ENUM ('admin', 'analyst', 'auditor');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'analyst',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, org_id, role)
);

-- Loan Applications
CREATE TABLE public.loan_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  applicant_name TEXT NOT NULL,
  pan_number TEXT,
  phone TEXT,
  email TEXT,
  loan_amount NUMERIC(12,2) NOT NULL,
  loan_type TEXT DEFAULT 'personal',
  device_fingerprint TEXT,
  ip_address TEXT,
  location TEXT,
  fpd_probability NUMERIC(5,4) DEFAULT 0,
  risk_tier TEXT DEFAULT 'low' CHECK (risk_tier IN ('low', 'medium', 'high')),
  decision TEXT DEFAULT 'pending' CHECK (decision IN ('pending', 'approve', 'manual_review', 'reject')),
  risk_factors JSONB DEFAULT '[]',
  stacking_score NUMERIC(5,4) DEFAULT 0,
  identity_score NUMERIC(5,4) DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Audit Logs
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Fraud Alerts
CREATE TABLE public.fraud_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  application_id UUID REFERENCES public.loan_applications(id) ON DELETE SET NULL,
  severity TEXT NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low')),
  alert_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'under_review', 'resolved', 'dismissed')),
  assigned_to UUID,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Decision Rules
CREATE TABLE public.decision_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  condition_json JSONB NOT NULL DEFAULT '{}',
  action TEXT NOT NULL DEFAULT 'flag',
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loan_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fraud_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.decision_rules ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Get user's org_id helper
CREATE OR REPLACE FUNCTION public.get_user_org_id(_user_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT org_id FROM public.profiles WHERE user_id = _user_id LIMIT 1
$$;

-- RLS Policies

-- Organizations: members can view their own org
CREATE POLICY "Users can view own org" ON public.organizations
  FOR SELECT USING (id = public.get_user_org_id(auth.uid()));

-- Profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- User Roles
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (user_id = auth.uid());

-- Loan Applications: org-scoped
CREATE POLICY "Org members can view applications" ON public.loan_applications
  FOR SELECT USING (org_id = public.get_user_org_id(auth.uid()));
CREATE POLICY "Org members can insert applications" ON public.loan_applications
  FOR INSERT WITH CHECK (org_id = public.get_user_org_id(auth.uid()));
CREATE POLICY "Org members can update applications" ON public.loan_applications
  FOR UPDATE USING (org_id = public.get_user_org_id(auth.uid()));

-- Audit Logs: org-scoped, read-only for users
CREATE POLICY "Org members can view audit logs" ON public.audit_logs
  FOR SELECT USING (org_id = public.get_user_org_id(auth.uid()));

-- Fraud Alerts: org-scoped
CREATE POLICY "Org members can view alerts" ON public.fraud_alerts
  FOR SELECT USING (org_id = public.get_user_org_id(auth.uid()));
CREATE POLICY "Org members can update alerts" ON public.fraud_alerts
  FOR UPDATE USING (org_id = public.get_user_org_id(auth.uid()));

-- Decision Rules: org-scoped
CREATE POLICY "Org members can view rules" ON public.decision_rules
  FOR SELECT USING (org_id = public.get_user_org_id(auth.uid()));
CREATE POLICY "Org admins can manage rules" ON public.decision_rules
  FOR ALL USING (org_id = public.get_user_org_id(auth.uid()) AND public.has_role(auth.uid(), 'admin'));

-- Auto-update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON public.organizations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_loan_applications_updated_at BEFORE UPDATE ON public.loan_applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER update_decision_rules_updated_at BEFORE UPDATE ON public.decision_rules FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql AS $$
DECLARE
  new_org_id UUID;
BEGIN
  -- Create a default org for the user
  INSERT INTO public.organizations (name, slug)
  VALUES (
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'My Organization'),
    NEW.id::text
  )
  RETURNING id INTO new_org_id;

  -- Create profile
  INSERT INTO public.profiles (user_id, org_id, full_name)
  VALUES (NEW.id, new_org_id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));

  -- Assign admin role
  INSERT INTO public.user_roles (user_id, org_id, role)
  VALUES (NEW.id, new_org_id, 'admin');

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Indexes
CREATE INDEX idx_loan_applications_org ON public.loan_applications(org_id);
CREATE INDEX idx_loan_applications_risk ON public.loan_applications(risk_tier);
CREATE INDEX idx_fraud_alerts_org ON public.fraud_alerts(org_id);
CREATE INDEX idx_fraud_alerts_status ON public.fraud_alerts(status);
CREATE INDEX idx_audit_logs_org ON public.audit_logs(org_id);
