import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2, ArrowLeft, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";

const statusColors = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-emerald-100 text-emerald-800",
  completed: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminPage() {
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({});

  const fetchBookings = useCallback(async () => {
    try {
      const res = await api.get("/bookings");
      setBookings(res.data);
    } catch {
      toast.error("Failed to fetch bookings");
    }
  }, []);

  const fetchContacts = useCallback(async () => {
    try {
      const res = await api.get("/contacts");
      setContacts(res.data);
    } catch {
      toast.error("Failed to fetch contacts");
    }
  }, []);

  useEffect(() => {
    fetchBookings();
    fetchContacts();
  }, [fetchBookings, fetchContacts]);

  const openEdit = (booking) => {
    setEditing(booking);
    setEditForm({ name: booking.name, email: booking.email, phone: booking.phone, status: booking.status, service_type: booking.service_type });
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/bookings/${editing.id}`, editForm);
      toast.success("Booking updated");
      setEditOpen(false);
      fetchBookings();
    } catch {
      toast.error("Failed to update booking");
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      await api.delete(`/bookings/${id}`);
      toast.success("Booking deleted");
      fetchBookings();
    } catch {
      toast.error("Failed to delete booking");
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await api.delete(`/contacts/${id}`);
      toast.success("Contact deleted");
      fetchContacts();
    } catch {
      toast.error("Failed to delete contact");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white border-b border-[#EFEFEF] px-6 py-4" data-testid="admin-header">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" data-testid="admin-back-link">
              <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
            </Link>
            <div>
              <h1 className="font-heading text-xl text-[#1A1A1A]">Dishu Studio</h1>
              <p className="text-xs text-[#999] uppercase tracking-widest">Admin Dashboard</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => { fetchBookings(); fetchContacts(); }} data-testid="admin-refresh-btn">
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="bookings" data-testid="admin-tabs">
          <TabsList className="mb-8">
            <TabsTrigger value="bookings" data-testid="admin-tab-bookings">Bookings ({bookings.length})</TabsTrigger>
            <TabsTrigger value="contacts" data-testid="admin-tab-contacts">Messages ({contacts.length})</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <div className="bg-white rounded-lg border border-[#EFEFEF] overflow-hidden">
              <Table data-testid="admin-bookings-table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12 text-[#999]">No bookings yet</TableCell>
                    </TableRow>
                  ) : (
                    bookings.map((b) => (
                      <TableRow key={b.id} data-testid={`booking-row-${b.id}`}>
                        <TableCell className="font-medium">{b.name}</TableCell>
                        <TableCell>{b.email}</TableCell>
                        <TableCell>{b.phone}</TableCell>
                        <TableCell className="capitalize">{b.service_type}</TableCell>
                        <TableCell>{b.preferred_date || "-"}</TableCell>
                        <TableCell>
                          <span className={`inline-block px-2 py-1 rounded text-xs capitalize ${statusColors[b.status] || "bg-gray-100 text-gray-800"}`}>
                            {b.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => openEdit(b)} data-testid={`edit-booking-${b.id}`}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" data-testid={`delete-booking-${b.id}`}>
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Booking</AlertDialogTitle>
                                  <AlertDialogDescription>Are you sure you want to delete this booking for {b.name}? This action cannot be undone.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteBooking(b.id)} data-testid={`confirm-delete-${b.id}`}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts">
            <div className="bg-white rounded-lg border border-[#EFEFEF] overflow-hidden">
              <Table data-testid="admin-contacts-table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12 text-[#999]">No messages yet</TableCell>
                    </TableRow>
                  ) : (
                    contacts.map((c) => (
                      <TableRow key={c.id} data-testid={`contact-row-${c.id}`}>
                        <TableCell className="font-medium">{c.name}</TableCell>
                        <TableCell>{c.email}</TableCell>
                        <TableCell>{c.phone}</TableCell>
                        <TableCell className="max-w-xs truncate">{c.message}</TableCell>
                        <TableCell>{new Date(c.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" data-testid={`delete-contact-${c.id}`}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Message</AlertDialogTitle>
                                <AlertDialogDescription>Are you sure you want to delete this message from {c.name}?</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteContact(c.id)} data-testid={`confirm-delete-contact-${c.id}`}>Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent data-testid="edit-booking-dialog">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Edit Booking</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4 py-4">
              <div>
                <label className="text-xs text-[#999] uppercase tracking-widest block mb-1">Name</label>
                <Input value={editForm.name || ""} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} data-testid="edit-name-input" />
              </div>
              <div>
                <label className="text-xs text-[#999] uppercase tracking-widest block mb-1">Email</label>
                <Input value={editForm.email || ""} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} data-testid="edit-email-input" />
              </div>
              <div>
                <label className="text-xs text-[#999] uppercase tracking-widest block mb-1">Phone</label>
                <Input value={editForm.phone || ""} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} data-testid="edit-phone-input" />
              </div>
              <div>
                <label className="text-xs text-[#999] uppercase tracking-widest block mb-1">Status</label>
                <Select value={editForm.status} onValueChange={(val) => setEditForm({ ...editForm, status: val })}>
                  <SelectTrigger data-testid="edit-status-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)} data-testid="edit-cancel-btn">Cancel</Button>
            <Button onClick={handleUpdate} className="bg-[#1A1A1A] text-white hover:bg-[#333]" data-testid="edit-save-btn">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
