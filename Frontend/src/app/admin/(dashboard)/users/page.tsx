import { Shield, UserCheck, UserX, Settings, Power } from "lucide-react";

const users = [
  {
    id: 1,
    name: "Arjun Sharma",
    email: "arjun@bharatyaatra.com",
    role: "Super Admin",
    status: "Active",
    joined: "Jan 5, 2026",
  },
  {
    id: 2,
    name: "Priya Mehta",
    email: "priya@bharatyaatra.com",
    role: "Admin",
    status: "Active",
    joined: "Jan 12, 2026",
  },
  {
    id: 3,
    name: "Rohan Staff",
    email: "rohan@bharatyaatra.com",
    role: "Staff",
    status: "Active",
    joined: "Feb 3, 2026",
  },
  {
    id: 4,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    role: "Customer",
    status: "Active",
    joined: "Mar 10, 2026",
  },
  {
    id: 5,
    name: "Anita Singh",
    email: "anita.s@example.com",
    role: "Customer",
    status: "Inactive",
    joined: "Feb 22, 2026",
  },
];

const roleColors: Record<string, string> = {
  "Super Admin": "bg-purple-100 text-purple-700",
  Admin: "bg-blue-100 text-blue-700",
  Staff: "bg-cyan-100 text-cyan-700",
  Customer: "bg-slate-100 text-slate-600",
};

export default function AdminUsersPage() {
  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">
          User Management
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage admin roles and customer accounts.
        </p>
      </div>

      {/* Role Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { role: "Super Admin", count: 1, color: "text-purple-600" },
          { role: "Admin", count: 1, color: "text-blue-600" },
          { role: "Staff", count: 1, color: "text-cyan-600" },
          { role: "Customers", count: 2, color: "text-slate-600" },
        ].map((r) => (
          <div
            key={r.role}
            className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-100 text-center"
          >
            <p className={`text-2xl sm:text-3xl font-extrabold ${r.color}`}>{r.count}</p>
            <p className="text-[10px] sm:text-sm text-gray-500 mt-1 font-bold uppercase tracking-tight">{r.role}</p>
          </div>
        ))}
      </div>

      {/* Users Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Desktop View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="text-left px-6 py-4 font-semibold text-gray-600">User</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">Role</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">Status</th>
                <th className="text-left px-6 py-4 font-semibold text-gray-600">Joined</th>
                <th className="text-right px-6 py-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                        {u.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 truncate">{u.name}</p>
                        <p className="text-[11px] text-gray-400 truncate">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg ${roleColors[u.role]}`}>
                      <Shield className="h-3 w-3" />
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg ${u.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                      {u.status === "Active" ? <UserCheck className="h-3 w-3" /> : <UserX className="h-3 w-3" />}
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs font-medium">{u.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Edit Role">
                         <Settings className="h-4 w-4" />
                       </button>
                       <button className={`p-2 rounded-lg transition-all ${u.status === "Active" ? "text-red-500 hover:bg-red-50" : "text-green-500 hover:bg-green-50"}`} title={u.status === "Active" ? "Deactivate" : "Activate"}>
                         <Power className="h-4 w-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile List View */}
        <div className="lg:hidden divide-y divide-slate-100">
          {users.map((u) => (
             <div key={u.id} className="p-4 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{u.name}</p>
                        <p className="text-[11px] text-slate-400">{u.email}</p>
                      </div>
                   </div>
                   <span className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg ${u.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                      {u.status === "Active" ? <UserCheck className="h-3 w-3" /> : <UserX className="h-3 w-3" />}
                      {u.status}
                    </span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                   <span className={`inline-flex items-center gap-1.5 font-black uppercase tracking-wider px-2.5 py-1 rounded-lg ${roleColors[u.role]}`}>
                      <Shield className="h-3 w-3" />
                      {u.role}
                   </span>
                   <span className="text-slate-400 font-medium">Joined: {u.joined}</span>
                </div>
                <div className="flex gap-2">
                   <button className="flex-1 bg-slate-100 text-slate-700 font-bold py-2.5 rounded-xl text-[11px] flex items-center justify-center gap-2">
                      <Settings className="h-3.5 w-3.5" />
                      Edit Role
                   </button>
                   <button className={`flex-1 font-bold py-2.5 rounded-xl text-[11px] flex items-center justify-center gap-2 ${u.status === "Active" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
                      <Power className="h-3.5 w-3.5" />
                      {u.status === "Active" ? "Deactivate" : "Activate"}
                   </button>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
