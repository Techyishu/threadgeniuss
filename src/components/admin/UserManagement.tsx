import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  email?: string;
  created_at: string;
}

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data: { users }, error } = await supabase.auth.admin.listUsers();
      if (error) throw error;
      setUsers(users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users. Make sure you have admin privileges.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const { error } = await supabase.auth.admin.deleteUser(userId);
      if (error) throw error;

      toast({
        title: "Success",
        description: "User has been deleted successfully",
      });
      
      // Refresh the users list
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Error",
        description: "Failed to delete user. Make sure you have admin privileges.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div 
            key={user.id} 
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          >
            <div>
              <p className="font-medium">{user.email}</p>
              <p className="text-sm text-gray-500">
                Created: {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={() => handleDeleteUser(user.id)}
            >
              Delete User
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};