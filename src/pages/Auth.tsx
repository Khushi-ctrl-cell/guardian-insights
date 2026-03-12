import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Mail, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [showForgot, setShowForgot] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Welcome back!", description: "Redirecting to dashboard..." });
      navigate("/");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
      options: {
        data: { full_name: signupName },
        emailRedirectTo: window.location.origin,
      },
    });
    setLoading(false);
    if (error) {
      toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: "Check your email",
        description: "We've sent a verification link to your email address.",
      });
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Check your email", description: "Password reset link sent to your email." });
      setShowForgot(false);
    }
  };

  if (showForgot) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-primary/20 glow-primary">
              <Shield className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-xl">Guardian Insights</h1>
              <p className="text-xs text-muted-foreground">Reset Password</p>
            </div>
          </div>
          <Card variant="glass">
            <CardContent className="p-6">
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="text-center mb-4">
                  <h2 className="text-lg font-semibold">Forgot Password?</h2>
                  <p className="text-sm text-muted-foreground">Enter your email and we'll send a reset link.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="forgot-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="forgot-email" type="email" placeholder="aman@company.com" className="pl-10" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} required />
                  </div>
                </div>
                <Button type="submit" className="w-full gap-2" disabled={loading}>
                  {loading ? "Sending..." : "Send Reset Link"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" className="w-full" onClick={() => setShowForgot(false)}>
                  ← Back to Sign In
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-primary/20 glow-primary">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-xl">Guardian Insights</h1>
            <p className="text-xs text-muted-foreground">Pre-Disbursement Intelligence</p>
          </div>
        </div>

        <Card variant="glass">
          <CardContent className="p-6">
            <Tabs defaultValue="login">
              <TabsList className="grid grid-cols-2 w-full mb-6">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="login-email" type="email" placeholder="aman@company.com" className="pl-10" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Password</Label>
                      <button type="button" className="text-xs text-primary hover:underline" onClick={() => setShowForgot(true)}>Forgot password?</button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="login-password" type="password" placeholder="••••••••" className="pl-10" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                    </div>
                  </div>
                  <Button type="submit" className="w-full gap-2" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="signup-name" placeholder="Aman Verma" className="pl-10" value={signupName} onChange={(e) => setSignupName(e.target.value)} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Work Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="signup-email" type="email" placeholder="aman@company.com" className="pl-10" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="signup-password" type="password" placeholder="Min 8 characters" className="pl-10" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required minLength={8} />
                    </div>
                  </div>
                  <Button type="submit" className="w-full gap-2" disabled={loading}>
                    {loading ? "Creating account..." : "Create Account"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    By signing up, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <button onClick={() => navigate("/landing")} className="text-primary hover:underline">
            ← Back to website
          </button>
        </p>
      </div>
    </div>
  );
}
