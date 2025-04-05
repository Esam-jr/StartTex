"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type TestUser = {
  email: string;
  password: string;
  role: string;
};

export default function TestAccountsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFixingAdmin, setIsFixingAdmin] = useState(false);
  const [isDebugging, setIsDebugging] = useState(false);
  const [isSimpleDebugging, setIsSimpleDebugging] = useState(false);
  const [isEmergencyReset, setIsEmergencyReset] = useState(false);
  const [newUser, setNewUser] = useState<TestUser | null>(null);
  const [adminSetupComplete, setAdminSetupComplete] = useState(false);
  const [debugResults, setDebugResults] = useState<any>(null);
  const [simpleDebugResults, setSimpleDebugResults] = useState<any>(null);

  // Admin credentials are predefined
  const adminUser: TestUser = {
    email: "admin@starttex.com",
    password: "Admin@123",
    role: "ADMIN",
  };

  // Ensure admin account exists
  useEffect(() => {
    setupAdminAccount();
  }, []);

  async function setupAdminAccount() {
    try {
      const response = await fetch("/api/auth/admin-setup");
      if (response.ok) {
        setAdminSetupComplete(true);
        toast.success("Admin account is ready to use");
      }
    } catch (error) {
      console.error("Admin setup failed:", error);
      toast.error("Failed to set up admin account");
    }
  }

  async function fixAdminAccount() {
    setIsFixingAdmin(true);
    try {
      const response = await fetch("/api/auth/fix-admin");
      if (response.ok) {
        const data = await response.json();
        console.log("Admin fix response:", data);
        
        if (data.verification_result) {
          toast.success("Admin account has been fixed successfully!");
        } else {
          toast.warning("Admin account was reset but verification failed. Try the bcrypt debug.");
        }
      } else {
        toast.error("Failed to fix admin account");
      }
    } catch (error) {
      console.error("Admin fix failed:", error);
      toast.error("Something went wrong while fixing admin account");
    } finally {
      setIsFixingAdmin(false);
    }
  }

  async function emergencyResetAdmin() {
    if (!confirm("WARNING: This will set the admin password WITHOUT hashing. This is a security risk and should only be used for testing. Continue?")) {
      return;
    }
    
    setIsEmergencyReset(true);
    try {
      const response = await fetch("/api/auth/reset-admin-plain");
      if (response.ok) {
        const data = await response.json();
        console.log("Admin emergency reset response:", data);
        toast.success("Admin account was reset with plain text password");
        toast.warning("SECURITY WARNING: The password is stored in plain text. This should NOT be used in production!");
      } else {
        toast.error("Failed to reset admin account");
      }
    } catch (error) {
      console.error("Admin emergency reset failed:", error);
      toast.error("Something went wrong");
    } finally {
      setIsEmergencyReset(false);
    }
  }

  async function debugBcrypt() {
    setIsDebugging(true);
    try {
      toast.info("Starting bcrypt diagnostics...");
      
      const response = await fetch("/api/auth/debug-bcrypt", {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache"
        }
      });
      
      console.log("Debug response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Debug API error:", errorText);
        toast.error(`API error: ${response.status} ${response.statusText}`);
        return;
      }
      
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("Failed to parse JSON:", parseError);
        toast.error("Failed to parse response from server");
        return;
      }
      
      setDebugResults(data);
      console.log("Bcrypt debug results:", data);
      
      if (data.summary?.all_methods_work) {
        toast.success("All bcrypt methods are working correctly!");
      } else {
        toast.error("Some bcrypt methods are not working correctly. See console for details.");
      }
    } catch (error) {
      console.error("Debug failed:", error);
      toast.error(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsDebugging(false);
    }
  }

  async function simpleDebugBcrypt() {
    setIsSimpleDebugging(true);
    try {
      toast.info("Running simple bcrypt test...");
      
      const response = await fetch("/api/auth/simple-debug", {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache"
        }
      });
      
      console.log("Simple debug response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Simple debug API error:", errorText);
        toast.error(`API error: ${response.status} ${response.statusText}`);
        return;
      }
      
      const data = await response.json();
      setSimpleDebugResults(data);
      console.log("Simple bcrypt test results:", data);
      
      if (data.success) {
        toast.success("Bcrypt basic test passed!");
      } else {
        toast.error("Bcrypt basic test failed!");
      }
    } catch (error) {
      console.error("Simple debug failed:", error);
      toast.error(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsSimpleDebugging(false);
    }
  }

  async function createTestUser() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/create-test-user");
      const data = await response.json();
      
      if (response.ok) {
        setNewUser(data.credentials);
        toast.success("New test user created successfully");
      } else {
        toast.error("Failed to create test user");
      }
    } catch (error) {
      console.error("Error creating test user:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  function copyCredentials(user: TestUser) {
    const credentials = `Email: ${user.email}\nPassword: ${user.password}\nRole: ${user.role}`;
    navigator.clipboard.writeText(credentials);
    toast.success("Credentials copied to clipboard");
  }

  return (
    <div className="container py-10">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Test Accounts</h1>
        <p className="text-gray-500 mb-8">
          Use these accounts to test the application with different roles.
        </p>

        <div className="grid gap-6">
          {/* Admin Account */}
          <div className="border rounded-lg p-6 bg-white shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">Admin Account</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Use this account to access admin-only features
                </p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                ADMIN
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Email:</span>
                <span className="font-medium">{adminUser.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Password:</span>
                <span className="font-medium">{adminUser.password}</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyCredentials(adminUser)}
              >
                Copy Credentials
              </Button>
              <Link href="/signin">
                <Button size="sm">Sign In as Admin</Button>
              </Link>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={fixAdminAccount}
                disabled={isFixingAdmin}
              >
                {isFixingAdmin ? "Fixing Admin..." : "Fix Admin Account"}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={debugBcrypt}
                disabled={isDebugging}
              >
                {isDebugging ? "Running Tests..." : "Debug Bcrypt"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={simpleDebugBcrypt}
                disabled={isSimpleDebugging}
              >
                {isSimpleDebugging ? "Testing..." : "Simple Debug"}
              </Button>
            </div>
            
            <div className="mt-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={emergencyResetAdmin}
                disabled={isEmergencyReset}
                className="w-full bg-red-50 text-red-800 border-red-200 hover:bg-red-100 hover:text-red-900 hover:border-red-300"
              >
                {isEmergencyReset ? "Resetting..." : "⚠️ Emergency Reset (Unsafe) ⚠️"}
              </Button>
              <p className="text-xs text-red-500 mt-1">
                Only use this as a last resort. Stores password as plain text!
              </p>
            </div>
          </div>

          {/* Simple Debug Results */}
          {simpleDebugResults && (
            <div className="border rounded-lg p-6 bg-white shadow-sm overflow-hidden">
              <h2 className="text-xl font-bold mb-4">Simple Bcrypt Test</h2>
              <div className="mt-2 overflow-auto max-h-40 text-xs font-mono p-4 bg-gray-50 rounded border">
                <pre>{JSON.stringify(simpleDebugResults, null, 2)}</pre>
              </div>
              <div className="mt-4 text-sm">
                {simpleDebugResults.success ? (
                  <p className="text-green-600">Basic bcrypt functionality is working!</p>
                ) : (
                  <p className="text-red-600">Basic bcrypt functionality is NOT working!</p>
                )}
              </div>
            </div>
          )}

          {/* Debug Results */}
          {debugResults && (
            <div className="border rounded-lg p-6 bg-white shadow-sm overflow-hidden">
              <h2 className="text-xl font-bold mb-4">Bcrypt Diagnostics</h2>
              <div className="mt-2 overflow-auto max-h-40 text-xs font-mono p-4 bg-gray-50 rounded border">
                <pre>{JSON.stringify(debugResults.summary, null, 2)}</pre>
              </div>
              <div className="mt-4 text-sm">
                {debugResults.summary.all_methods_work ? (
                  <p className="text-green-600">All bcrypt methods are working correctly.</p>
                ) : (
                  <p className="text-red-600">Some bcrypt methods failed. Check the console for details.</p>
                )}
              </div>
            </div>
          )}

          {/* New Test User (if created) */}
          {newUser && (
            <div className="border rounded-lg p-6 bg-white shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">New Test User</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    This account was created for testing
                  </p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  {newUser.role}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Email:</span>
                  <span className="font-medium">{newUser.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Password:</span>
                  <span className="font-medium">{newUser.password}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyCredentials(newUser)}
                >
                  Copy Credentials
                </Button>
                <Link href="/signin">
                  <Button size="sm">Sign In as User</Button>
                </Link>
              </div>
            </div>
          )}

          {/* Create New Test User Button */}
          <div className="mt-6">
            <Button 
              onClick={createTestUser} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Creating Test User..." : "Create New Test User"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 