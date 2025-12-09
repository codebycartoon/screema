import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Bell, CreditCard, LogOut, Loader2, Camera, Save } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet-async';

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Profile data
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [promotionalEmails, setPromotionalEmails] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    } else if (user) {
      setFullName(user.user_metadata?.full_name || '');
      setEmail(user.email || '');
      setPhone(user.user_metadata?.phone || '');
    }
  }, [user, authLoading, navigate]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          phone: phone,
        },
      });

      if (error) throw error;

      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Profile Settings | SCREEMA</title>
        <meta name="description" content="Manage your account settings and preferences." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="font-display text-3xl font-bold mb-8">Profile Settings</h1>

            <div className="space-y-6">
              {/* Profile Information */}
              <div className="glass rounded-2xl p-6 border border-border/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold">Personal Information</h2>
                    <p className="text-sm text-muted-foreground">Update your personal details</p>
                  </div>
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-6 mb-6 pb-6 border-b border-border/50">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-white font-bold text-3xl">
                      {user?.email?.charAt(0).toUpperCase()}
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{fullName || 'User'}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{email}</p>
                    <Button variant="outline" size="sm">Change Avatar</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Email cannot be changed. Contact support if needed.
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <Button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="w-full sm:w-auto"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="glass rounded-2xl p-6 border border-border/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-blue-500/10">
                    <Bell className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold">Notifications</h2>
                    <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <div className="font-semibold">Email Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Receive booking confirmations and updates
                      </div>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-t border-border/50">
                    <div>
                      <div className="font-semibold">SMS Notifications</div>
                      <div className="text-sm text-muted-foreground">
                        Get text messages for important updates
                      </div>
                    </div>
                    <Switch
                      checked={smsNotifications}
                      onCheckedChange={setSmsNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between py-3 border-t border-border/50">
                    <div>
                      <div className="font-semibold">Promotional Emails</div>
                      <div className="text-sm text-muted-foreground">
                        Receive special offers and movie recommendations
                      </div>
                    </div>
                    <Switch
                      checked={promotionalEmails}
                      onCheckedChange={setPromotionalEmails}
                    />
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="glass rounded-2xl p-6 border border-border/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-green-500/10">
                    <Lock className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold">Security</h2>
                    <p className="text-sm text-muted-foreground">Manage your password and security settings</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="glass rounded-2xl p-6 border border-border/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-purple-500/10">
                    <CreditCard className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold">Payment Methods</h2>
                    <p className="text-sm text-muted-foreground">Manage your saved payment methods</p>
                  </div>
                </div>

                <div className="text-center py-8">
                  <CreditCard className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground mb-4">No payment methods saved</p>
                  <Button variant="outline">
                    Add Payment Method
                  </Button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="glass rounded-2xl p-6 border border-destructive/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-destructive/10">
                    <LogOut className="w-6 h-6 text-destructive" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-destructive">Danger Zone</h2>
                    <p className="text-sm text-muted-foreground">Irreversible actions</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto text-destructive hover:text-destructive"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full sm:w-auto"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Profile;
