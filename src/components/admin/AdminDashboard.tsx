import { useEffect, useState } from "react";
import {
  Users, Trophy, BarChart2, Trash2, Plus, Edit, RefreshCw, X, ChevronDown, ChevronUp
} from "lucide-react";

const API = "http://localhost:8080/api";

// ===================== TYPES =====================
interface BasicInfo {
  totalUsers: number;
  binusianUsers: number;
  smaUsers: number;
  otherUsers: number;
  totalTeams: number;
  activeCompetitions: number;
  upcomingEvents: number;
  totalParticipants: number;
  categoryCount: number;
}

interface CompetitionStat {
  id: string;
  name: string;
  category: string;
  totalTeams: number;
  totalParticipants: number;
  paidTeams: number;
  pendingTeams: number;
  binusianRegistrationFee: number;
  nonBinusianRegistrationFee: number;
  competitionType: string;
}

interface Team {
  id: string;
  teamName: string;
  teamCode: string;
  isPaid: boolean;
  competition: { id: string; name: string; category: string };
  teamLeader: { fullName: string; email: string };
  members: { fullName: string; email: string }[];
  createdAt: string;
}

interface Competition {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  bookletUrl: string;
  paidMessage: string;
  registrationStartDate: string;
  registrationEndDate: string;
  competitionStartDate: string;
  competitionEndDate: string;
  competitionType: string;
  venue: string;
  binusianRegistrationFee: number;
  nonBinusianRegistrationFee: number;
  maxMembers: number | null;
  minMembers: number | null;
  teamSlot: number;
  faq: any;
  timeline: any;
}

// ===================== HELPERS =====================
function authHeaders(): Record<string, string> {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-[#dfcbb2] border-4 border-[#4a3f35] rounded-lg shadow-[4px_4px_0px_#4a3f35] p-5 flex flex-col gap-1">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#6b4423]">{label}</p>
      <p className="text-3xl font-black text-[#3c2f25]">{value}</p>
    </div>
  );
}

// ===================== MAIN COMPONENT =====================
export default function AdminDashboard() {
  const [basicInfo, setBasicInfo] = useState<BasicInfo | null>(null);
  const [competitionStats, setCompetitionStats] = useState<CompetitionStat[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "competitions" | "teams">("overview");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Competition | null>(null);
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const [filterCompetition, setFilterCompetition] = useState<string>("all");
  const [filterPayment, setFilterPayment] = useState<string>("all");
  const [notif, setNotif] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const showNotif = (type: "success" | "error", msg: string) => {
    setNotif({ type, msg });
    setTimeout(() => setNotif(null), 3500);
  };

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [infoRes, statsRes, teamsRes, compRes] = await Promise.all([
        fetch(`${API}/admin/basic-info`, { headers: authHeaders() }),
        fetch(`${API}/admin/competitions-statistics`, { headers: authHeaders() }),
        fetch(`${API}/admin/all-teams`, { headers: authHeaders() }),
        fetch(`${API}/competitions`),
      ]);
      setBasicInfo(await infoRes.json());
      setCompetitionStats(await statsRes.json());
      setTeams(await teamsRes.json());
      setCompetitions(await compRes.json());
    } catch {
      showNotif("error", "Gagal memuat data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleDeleteCompetition = async (id: string, name: string) => {
    if (!confirm(`Hapus kompetisi "${name}"? Aksi ini tidak bisa dibatalkan.`)) return;
    const res = await fetch(`${API}/admin/delete-competition/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (res.ok) {
      showNotif("success", `Kompetisi "${name}" berhasil dihapus.`);
      fetchAll();
    } else {
      const data = await res.json();
      showNotif("error", data.error || "Gagal menghapus kompetisi.");
    }
  };

  const handleDeleteTeam = async (teamCode: string, teamName: string) => {
    if (!confirm(`Hapus team "${teamName}"? Aksi ini tidak bisa dibatalkan.`)) return;
    const res = await fetch(`${API}/admin/delete-team/${teamCode}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
    if (res.ok) {
      showNotif("success", `Team "${teamName}" berhasil dihapus.`);
      fetchAll();
    } else {
      const data = await res.json();
      showNotif("error", data.error || "Gagal menghapus team.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4efe5] flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#e4d3b4] border-t-orange-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4efe5] p-4 md:p-8 font-sans text-[#3c2f25]">
      <div className="max-w-7xl mx-auto mt-[5%]">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-[#3c2f25]">Admin Panel</h1>
            <p className="text-sm text-gray-500 mt-1">BurnCup 2026 — Management Dashboard</p>
          </div>
          <button
            onClick={fetchAll}
            className="flex items-center gap-2 bg-[#4A2E1A] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#6B4423] transition-colors text-sm"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>

        {/* Notification */}
        {notif && (
          <div className={`mb-6 flex items-center justify-between px-4 py-3 rounded-lg border-2 font-semibold text-sm ${
            notif.type === "success"
              ? "bg-green-50 border-green-400 text-green-700"
              : "bg-red-50 border-red-400 text-red-700"
          }`}>
            <span>{notif.msg}</span>
            <button onClick={() => setNotif(null)}><X size={16} /></button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b-2 border-[#4a3f35]">
          {(["overview", "competitions", "teams"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 font-bold text-sm capitalize rounded-t-lg transition-colors ${
                activeTab === tab
                  ? "bg-[#4A2E1A] text-white"
                  : "bg-[#dfcbb2] text-[#3c2f25] hover:bg-[#c9b49a]"
              }`}
            >
              {tab === "overview" ? "Overview" : tab === "competitions" ? "Competitions" : "Teams"}
            </button>
          ))}
        </div>

        {/* ===== TAB: OVERVIEW ===== */}
        {activeTab === "overview" && basicInfo && (
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <StatCard label="Total Users" value={basicInfo.totalUsers} />
              <StatCard label="Binusian" value={basicInfo.binusianUsers} />
              <StatCard label="SMA / SMK" value={basicInfo.smaUsers} />
              <StatCard label="Others" value={basicInfo.otherUsers} />
              <StatCard label="Total Teams" value={basicInfo.totalTeams} />
              <StatCard label="Active Competitions" value={basicInfo.activeCompetitions} />
              <StatCard label="Upcoming Events" value={basicInfo.upcomingEvents} />
              <StatCard label="Categories" value={basicInfo.categoryCount} />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <BarChart2 size={20} className="text-[#6b4423]" />
                <h2 className="text-lg font-black">Competition Statistics</h2>
              </div>
              <div className="bg-[#dfcbb2] border-4 border-[#4a3f35] rounded-lg shadow-[4px_4px_0px_#4a3f35] overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-[#4a3f35]">
                      <th className="text-left px-4 py-3 font-black">Competition</th>
                      <th className="text-left px-4 py-3 font-black">Category</th>
                      <th className="text-left px-4 py-3 font-black">Type</th>
                      <th className="text-center px-4 py-3 font-black">Teams</th>
                      <th className="text-center px-4 py-3 font-black">Paid</th>
                      <th className="text-center px-4 py-3 font-black">Pending</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitionStats.map((stat) => (
                      <tr key={stat.id} className="border-b border-[#4a3f35]/20 hover:bg-[#c9b49a]/30 transition-colors">
                        <td className="px-4 py-3 font-semibold">{stat.name}</td>
                        <td className="px-4 py-3">{stat.category}</td>
                        <td className="px-4 py-3">{stat.competitionType}</td>
                        <td className="px-4 py-3 text-center">{stat.totalTeams}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full text-xs">{stat.paidTeams}</span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="bg-yellow-100 text-yellow-700 font-bold px-2 py-0.5 rounded-full text-xs">{stat.pendingTeams}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===== TAB: COMPETITIONS ===== */}
        {activeTab === "competitions" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy size={20} className="text-[#6b4423]" />
                <h2 className="text-lg font-black">Competitions ({competitions.length})</h2>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-[3px_3px_0px_#4a3f35]"
              >
                <Plus size={16} />
                Add Competition
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {competitions.map((comp) => (
                <div
                  key={comp.id}
                  className="bg-[#dfcbb2] border-4 border-[#4a3f35] rounded-lg shadow-[4px_4px_0px_#4a3f35] overflow-hidden flex flex-col"
                >
                  <div className="h-36 overflow-hidden">
                    <img src={comp.imageUrl} alt={comp.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/assets/Logo Burncup.svg"; }} />
                  </div>
                  <div className="p-4 flex flex-col flex-1 gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-black text-base leading-tight">{comp.name}</h3>
                      <span className="shrink-0 text-xs bg-[#4A2E1A] text-white px-2 py-0.5 rounded-full font-semibold">{comp.category}</span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">{comp.description}</p>
                    <div className="text-xs text-gray-500 space-y-1 mt-1">
                      <p><span className="font-semibold text-[#6b4423]">Reg:</span> {comp.registrationStartDate.slice(0,10)} to {comp.registrationEndDate.slice(0,10)}</p>
                      <p><span className="font-semibold text-[#6b4423]">Competition:</span> {comp.competitionStartDate.slice(0,10)} to {comp.competitionEndDate.slice(0,10)}</p>
                      <p><span className="font-semibold text-[#6b4423]">Venue:</span> {comp.venue}</p>
                      <p><span className="font-semibold text-[#6b4423]">Slots:</span> {comp.teamSlot} teams</p>
                    </div>
                    <div className="flex gap-2 mt-auto pt-3">
                      <button
                        onClick={() => { setEditTarget(comp); setShowEditModal(true); }}
                        className="flex-1 flex items-center justify-center gap-1 bg-[#4A2E1A] text-white py-2 rounded-lg font-semibold text-xs hover:bg-[#6B4423] transition-colors"
                      >
                        <Edit size={13} /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCompetition(comp.id, comp.name)}
                        className="flex-1 flex items-center justify-center gap-1 bg-red-500 text-white py-2 rounded-lg font-semibold text-xs hover:bg-red-600 transition-colors"
                      >
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== TAB: TEAMS ===== */}
        {activeTab === "teams" && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Users size={20} className="text-[#6b4423]" />
              <h2 className="text-lg font-black">All Teams ({teams.length})</h2>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wide text-[#6b4423]">Competition</label>
                <select
                  value={filterCompetition}
                  onChange={(e) => setFilterCompetition(e.target.value)}
                  className="bg-[#dfcbb2] border-2 border-[#4a3f35] rounded-lg px-3 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-orange-300 min-w-[200px]"
                >
                  <option value="all">All Competitions</option>
                  {competitions.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase tracking-wide text-[#6b4423]">Payment Status</label>
                <select
                  value={filterPayment}
                  onChange={(e) => setFilterPayment(e.target.value)}
                  className="bg-[#dfcbb2] border-2 border-[#4a3f35] rounded-lg px-3 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-orange-300"
                >
                  <option value="all">All Status</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              {(filterCompetition !== "all" || filterPayment !== "all") && (
                <div className="flex flex-col justify-end">
                  <button
                    onClick={() => { setFilterCompetition("all"); setFilterPayment("all"); }}
                    className="flex items-center gap-1 px-3 py-2 text-xs font-bold border-2 border-[#4a3f35] rounded-lg hover:bg-[#dfcbb2] transition-colors"
                  >
                    <X size={12} /> Reset Filter
                  </button>
                </div>
              )}
            </div>

            {/* Filtered count */}
            {(() => {
              const filtered = teams.filter((t) => {
                const matchComp = filterCompetition === "all" || t.competition?.id === filterCompetition;
                const matchPay = filterPayment === "all" || (filterPayment === "paid" ? t.isPaid : !t.isPaid);
                return matchComp && matchPay;
              });
              return (
                <div className="flex flex-col gap-3">
                  <p className="text-xs text-gray-500 font-semibold">
                    Showing {filtered.length} of {teams.length} teams
                  </p>
                  {filtered.length === 0 && (
                    <div className="bg-[#dfcbb2] border-4 border-[#4a3f35] rounded-lg p-8 text-center">
                      <p className="font-bold text-[#6b4423]">No teams match the filter.</p>
                    </div>
                  )}
                  {filtered.map((team) => (
                <div
                  key={team.id}
                  className="bg-[#dfcbb2] border-4 border-[#4a3f35] rounded-lg shadow-[4px_4px_0px_#4a3f35] overflow-hidden"
                >
                  <div
                    className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-[#c9b49a]/30 transition-colors"
                    onClick={() => setExpandedTeam(expandedTeam === team.id ? null : team.id)}
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-black text-base">{team.teamName}</span>
                      <span className="text-xs font-mono bg-[#4A2E1A]/10 px-2 py-0.5 rounded border border-[#4A2E1A]/20">{team.teamCode}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${team.isPaid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {team.isPaid ? "Paid" : "Pending"}
                      </span>
                      <span className="text-xs text-gray-500">{team.competition?.name}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteTeam(team.teamCode, team.teamName); }}
                        className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-lg font-semibold text-xs hover:bg-red-600 transition-colors"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                      {expandedTeam === team.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </div>

                  {expandedTeam === team.id && (
                    <div className="px-5 pb-4 border-t-2 border-[#4a3f35]/20 pt-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#6b4423] mb-2">Members</p>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3 bg-[#f4efe5] rounded-lg px-3 py-2">
                          <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold uppercase">
                            {team.teamLeader?.fullName?.charAt(0) || team.teamLeader?.email?.charAt(0) || "?"}
                          </div>
                          <div>
                            <p className="text-xs font-bold">{team.teamLeader?.fullName || "—"} <span className="text-orange-500 font-black">(Leader)</span></p>
                            <p className="text-xs text-gray-500">{team.teamLeader?.email}</p>
                          </div>
                        </div>
                        {team.members?.map((m, i) => (
                          <div key={i} className="flex items-center gap-3 bg-[#f4efe5] rounded-lg px-3 py-2">
                            <div className="w-7 h-7 rounded-full bg-[#4A2E1A] text-white flex items-center justify-center text-xs font-bold uppercase">
                              {m?.fullName?.charAt(0) || m?.email?.charAt(0) || "?"}
                            </div>
                            <div>
                              <p className="text-xs font-bold">{m?.fullName || "—"}</p>
                              <p className="text-xs text-gray-500">{m?.email}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          );
        })()}
        </div>
        )}
      </div>

      {showAddModal && (
        <CompetitionModal
          mode="add"
          onClose={() => setShowAddModal(false)}
          onSuccess={() => { setShowAddModal(false); fetchAll(); showNotif("success", "Kompetisi berhasil ditambahkan!"); }}
        />
      )}

      {showEditModal && editTarget && (
        <CompetitionModal
          mode="edit"
          competition={editTarget}
          onClose={() => { setShowEditModal(false); setEditTarget(null); }}
          onSuccess={() => { setShowEditModal(false); setEditTarget(null); fetchAll(); showNotif("success", "Kompetisi berhasil diupdate!"); }}
        />
      )}
    </div>
  );
}

// ===================== COMPETITION MODAL =====================
interface CompetitionModalProps {
  mode: "add" | "edit";
  competition?: Competition;
  onClose: () => void;
  onSuccess: () => void;
}

function CompetitionModal({ mode, competition, onClose, onSuccess }: CompetitionModalProps) {
  const [form, setForm] = useState({
    name: competition?.name ?? "",
    description: competition?.description ?? "",
    category: competition?.category ?? "",
    imageUrl: competition?.imageUrl ?? "",
    bookletUrl: competition?.bookletUrl ?? "",
    paidMessage: competition?.paidMessage ?? "",
    registrationStartDate: competition?.registrationStartDate ?? "",
    registrationEndDate: competition?.registrationEndDate ?? "",
    competitionStartDate: competition?.competitionStartDate ?? "",
    competitionEndDate: competition?.competitionEndDate ?? "",
    competitionType: competition?.competitionType ?? "",
    venue: competition?.venue ?? "",
    binusianRegistrationFee: competition?.binusianRegistrationFee ?? 0,
    nonBinusianRegistrationFee: competition?.nonBinusianRegistrationFee ?? 0,
    teamSlot: competition?.teamSlot ?? 1,
    maxMembers: competition?.maxMembers ?? "",
    minMembers: competition?.minMembers ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      binusianRegistrationFee: Number(form.binusianRegistrationFee),
      nonBinusianRegistrationFee: Number(form.nonBinusianRegistrationFee),
      teamSlot: Number(form.teamSlot),
      maxMembers: form.maxMembers !== "" ? Number(form.maxMembers) : null,
      minMembers: form.minMembers !== "" ? Number(form.minMembers) : null,
      prizes: [],
      requirements: [],
      rules: [],
      faq: {},
      timeline: [],
    };

    const url = mode === "add"
      ? `${API}/admin/add-competition`
      : `${API}/admin/update-competition/${competition!.id}`;

    const res = await fetch(url, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (res.ok) {
      onSuccess();
    } else {
      const data = await res.json();
      setError(data.error || "Gagal menyimpan kompetisi.");
    }
  };

  const fields: { name: keyof typeof form; label: string; type?: string; textarea?: boolean }[] = [
    { name: "name", label: "Name" },
    { name: "description", label: "Description", textarea: true },
    { name: "category", label: "Category" },
    { name: "imageUrl", label: "Image URL" },
    { name: "bookletUrl", label: "Booklet URL" },
    { name: "paidMessage", label: "Paid Message", textarea: true },
    { name: "registrationStartDate", label: "Registration Start", type: "date" },
    { name: "registrationEndDate", label: "Registration End", type: "date" },
    { name: "competitionStartDate", label: "Competition Start", type: "date" },
    { name: "competitionEndDate", label: "Competition End", type: "date" },
    { name: "competitionType", label: "Competition Type" },
    { name: "venue", label: "Venue" },
    { name: "binusianRegistrationFee", label: "Binusian Fee (IDR)", type: "number" },
    { name: "nonBinusianRegistrationFee", label: "Non-Binusian Fee (IDR)", type: "number" },
    { name: "teamSlot", label: "Team Slots", type: "number" },
    { name: "maxMembers", label: "Max Members (optional)", type: "number" },
    { name: "minMembers", label: "Min Members (optional)", type: "number" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-[#f4efe5] border-4 border-[#4a3f35] rounded-lg shadow-[6px_6px_0px_#4a3f35] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-[#4a3f35] sticky top-0 bg-[#f4efe5]">
          <h2 className="font-black text-lg">{mode === "add" ? "Add Competition" : "Edit Competition"}</h2>
          <button onClick={onClose} className="hover:text-red-500 transition-colors"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          {error && (
            <div className="bg-red-50 border-2 border-red-400 text-red-700 text-sm px-4 py-2 rounded-lg font-semibold">
              {error}
            </div>
          )}

          {fields.map(({ name, label, type, textarea }) => (
            <div key={name} className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase tracking-wide text-[#6b4423]">{label}</label>
              {textarea ? (
                <textarea
                  name={name}
                  value={form[name] as string}
                  onChange={handleChange}
                  rows={3}
                  className="bg-[#dfcbb2] border-2 border-[#4a3f35] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300 resize-none"
                />
              ) : (
                <input
                  name={name}
                  type={type ?? "text"}
                  value={form[name] as string | number}
                  onChange={handleChange}
                  className="bg-[#dfcbb2] border-2 border-[#4a3f35] rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-300"
                />
              )}
            </div>
          ))}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border-2 border-[#4a3f35] font-bold text-sm hover:bg-[#dfcbb2] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-colors disabled:opacity-60"
            >
              {loading ? "Saving..." : mode === "add" ? "Add Competition" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
