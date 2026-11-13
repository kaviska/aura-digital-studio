"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowDown, ArrowUp, LogOut, Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Credential = {
  label: string;
  username: string;
  password: string;
  notes: string;
};

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  techStack: string[];
  liveUrl?: string;
  sortOrder: number;
  credentials: Credential[];
};

const emptyProject = (): Omit<Project, "id" | "sortOrder"> => ({
  title: "",
  description: "",
  image: "",
  category: "Web Apps",
  techStack: [],
  liveUrl: "",
  credentials: [],
});

export function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState(emptyProject());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function loadProjects() {
    const response = await fetch("/api/admin/projects");
    if (response.status === 401) {
      window.location.href = "/admin/login";
      return;
    }
    if (!response.ok) throw new Error("Unable to load projects");
    setProjects(await response.json());
    setLoading(false);
  }

  useEffect(() => {
    loadProjects().catch((error) => {
      setMessage(error instanceof Error ? error.message : "Unable to load projects");
      setLoading(false);
    });
  }, []);

  function startCreate() {
    setEditingId(null);
    setForm(emptyProject());
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startEdit(project: Project) {
    setEditingId(project.id);
    setForm({
      title: project.title,
      description: project.description,
      image: project.image,
      category: project.category,
      techStack: project.techStack,
      liveUrl: project.liveUrl || "",
      credentials: project.credentials,
    });
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function uploadImage() {
    if (!imageFile) return form.image;
    const data = new FormData();
    data.append("image", imageFile);
    const response = await fetch("/api/projects/upload", { method: "POST", body: data });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Unable to upload image");
    return result.image as string;
  }

  async function saveProject(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const image = await uploadImage();
      const payload = {
        ...form,
        image,
        techStack: form.techStack,
      };
      const response = await fetch(editingId ? `/api/projects/${editingId}` : "/api/projects", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to save project");

      setMessage(editingId ? "Project updated." : "Project created.");
      await loadProjects();
      startCreate();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save project");
    } finally {
      setSaving(false);
    }
  }

  async function deleteProject(id: string) {
    if (!window.confirm("Delete this project?")) return;
    const response = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setMessage("Unable to delete project");
      return;
    }
    setProjects((current) => current.filter((project) => project.id !== id));
    if (editingId === id) startCreate();
  }

  async function moveProject(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= projects.length) return;
    const next = [...projects];
    [next[index], next[nextIndex]] = [next[nextIndex], next[index]];
    setProjects(next);
    const response = await fetch("/api/projects/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projects: next.map((project) => ({ id: project.id })) }),
    });
    if (!response.ok) setMessage("Unable to save project order");
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  function updateCredential(index: number, field: keyof Credential, value: string) {
    setForm((current) => ({
      ...current,
      credentials: current.credentials.map((credential, credentialIndex) =>
        credentialIndex === index ? { ...credential, [field]: value } : credential,
      ),
    }));
  }

  if (loading) {
    return <main className="min-h-screen bg-background p-8 text-muted-foreground">Loading admin panel...</main>;
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/60">
        <div className="container mx-auto flex items-center justify-between px-4 py-5">
          <div>
            <p className="text-sm font-medium text-primary">OOLLN</p>
            <h1 className="font-display text-2xl font-bold">Project Admin</h1>
          </div>
          <Button variant="ghost" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
        </div>
      </header>

      <div className="container mx-auto grid gap-8 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <section className="order-2 space-y-4 lg:order-1">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold">Projects</h2>
              <p className="text-sm text-muted-foreground">Use the arrows to control public card order.</p>
            </div>
            <Button onClick={startCreate}><Plus className="mr-2 h-4 w-4" /> New project</Button>
          </div>

          {projects.length === 0 && (
            <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
              No projects yet. Create your first project.
            </div>
          )}
          {projects.map((project, index) => (
            <article key={project.id} className="glass flex gap-4 rounded-xl p-4">
              <img src={project.image} alt="" className="h-24 w-32 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-wide text-primary">{project.category}</p>
                <h3 className="font-display text-lg font-bold">{project.title}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
              </div>
              <div className="flex flex-col gap-1">
                <Button variant="ghost" size="icon" onClick={() => moveProject(index, -1)} disabled={index === 0} aria-label="Move up"><ArrowUp className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => moveProject(index, 1)} disabled={index === projects.length - 1} aria-label="Move down"><ArrowDown className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => startEdit(project)} aria-label="Edit project"><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" onClick={() => deleteProject(project.id)} aria-label="Delete project"><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </article>
          ))}
        </section>

        <section className="order-1 lg:order-2">
          <form onSubmit={saveProject} className="glass space-y-4 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">{editingId ? "Edit project" : "New project"}</h2>
              {editingId && <Button type="button" variant="ghost" size="icon" onClick={startCreate}><X className="h-4 w-4" /></Button>}
            </div>
            <label className="block text-sm font-medium">Name<Input className="mt-2" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required /></label>
            <label className="block text-sm font-medium">Description<textarea className="mt-2 flex min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} required /></label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium">Category<Input className="mt-2" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} /></label>
              <label className="block text-sm font-medium">Technologies<Input className="mt-2" value={form.techStack.join(", ")} onChange={(event) => setForm({ ...form, techStack: event.target.value.split(",").map((value) => value.trim()).filter(Boolean) })} placeholder="React, Next, MongoDB" /></label>
            </div>
            <label className="block text-sm font-medium">Project link (optional)<Input className="mt-2" type="url" value={form.liveUrl} onChange={(event) => setForm({ ...form, liveUrl: event.target.value })} placeholder="https://" /></label>
            <label className="block text-sm font-medium">Image
              <Input className="mt-2" type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={(event) => setImageFile(event.target.files?.[0] || null)} />
            </label>
            {form.image && <img src={form.image} alt="Current project" className="h-32 w-full rounded-lg object-cover" />}
            <div className="space-y-3 border-t border-border/50 pt-4">
              <div className="flex items-center justify-between">
                <div><h3 className="font-medium">Private login details</h3><p className="text-xs text-muted-foreground">Encrypted and visible only to admins.</p></div>
                <Button type="button" variant="outline" size="sm" onClick={() => setForm({ ...form, credentials: [...form.credentials, { label: "", username: "", password: "", notes: "" }] })}><Plus className="mr-1 h-4 w-4" /> Add</Button>
              </div>
              {form.credentials.map((credential, index) => (
                <div key={index} className="space-y-2 rounded-lg border border-border/50 p-3">
                  <div className="flex justify-between"><span className="text-xs text-muted-foreground">Credential {index + 1}</span><button type="button" onClick={() => setForm({ ...form, credentials: form.credentials.filter((_, credentialIndex) => credentialIndex !== index) })} className="text-muted-foreground hover:text-destructive"><X className="h-4 w-4" /></button></div>
                  <Input placeholder="Label (Admin demo)" value={credential.label} onChange={(event) => updateCredential(index, "label", event.target.value)} />
                  <Input placeholder="Username or email" value={credential.username} onChange={(event) => updateCredential(index, "username", event.target.value)} />
                  <Input placeholder="Password" value={credential.password} onChange={(event) => updateCredential(index, "password", event.target.value)} />
                  <Input placeholder="Notes (optional)" value={credential.notes} onChange={(event) => updateCredential(index, "notes", event.target.value)} />
                </div>
              ))}
            </div>
            {message && <p className="text-sm text-muted-foreground">{message}</p>}
            <Button type="submit" className="w-full" disabled={saving}>
              {saving ? <><Upload className="mr-2 h-4 w-4 animate-pulse" /> Saving...</> : editingId ? "Update project" : "Create project"}
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
}
