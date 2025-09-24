import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Filter, FolderOpen, RotateCcw, Search, Trash } from 'lucide-react';
import { useState } from 'react';
import ProjectModal from './partials/projectModal';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import AdminPageHeader from '../components/AdminPageHeader';


const breadcrumbs = [
    {
        title: 'Projects',
        href: '/admin/projects',
    },
];
export default function ProjectsAdmin() {
    const { projects = [] } = usePage().props;
    const { delete: destroy } = useForm();
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false)
    const [selectedProject, setSelectedProject] = useState(null)

    const filteredProjects = projects.filter(
        (project) =>
            project?.name?.toLowerCase().includes(search?.toLowerCase()) ||
            project?.description?.en?.toLowerCase().includes(search?.toLowerCase()) ||
            project?.description?.fr?.toLowerCase().includes(search?.toLowerCase()) ||
            project?.description?.ar?.toLowerCase().includes(search?.toLowerCase()),
    );

    const onDeleteProject = (projectID) => {
        destroy(route('projects.destroy', projectID));
    };

    const hasSearch = search.length > 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />

            <div className="min-h-screen bg-white">
                {/* Header Section */}
                <AdminPageHeader
                    icon={FolderOpen}
                    title="Project Management"
                    description="Manage your projects and portfolios"
                    actions={<ProjectModal />}
                />

                {/* Statistics Cards */}
                <div className="mx-auto -mt-4 max-w-7xl px-6">
                    <div className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-3">
                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Total Projects</p>
                                        <p className="text-3xl font-bold text-[#212529]">{projects.length}</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 p-3">
                                        <FolderOpen className="h-6 w-6 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Active Projects</p>
                                        <p className="text-3xl font-bold text-[#212529]">{projects.length}</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 p-3">
                                        <FolderOpen className="h-6 w-6 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Search Results</p>
                                        <p className="text-3xl font-bold text-[#212529]">{filteredProjects.length}</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 p-3">
                                        <Search className="h-6 w-6 text-[#212529]" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="mx-auto mb-8 max-w-7xl px-6">
                    <Card className="border-0 bg-gray-50">
                        <CardContent className="p-6">
                            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                                <div className="flex items-center gap-2">
                                    <Filter className="h-5 w-5 text-[#212529]" />
                                    <h3 className="text-lg font-semibold text-[#212529]">Filter Projects</h3>
                                    {hasSearch && (
                                        <Badge variant="secondary" className="bg-gray-100 px-2 py-1 text-[#212529]">
                                            {filteredProjects.length} result{filteredProjects.length !== 1 ? 's' : ''}
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                                    <div className="relative">
                                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
                                        <Input
                                            type="text"
                                            placeholder="Search projects..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="w-full pl-10 transition-all duration-200 ease-in-out focus:ring-2 focus:ring-[#212529]/20 sm:w-80"
                                        />
                                    </div>
                                    {hasSearch && (
                                        <Button
                                            variant="outline"
                                            onClick={() => setSearch('')}
                                            className="border-gray-300 text-gray-700 transition-all duration-200 ease-in-out hover:bg-gray-100"
                                        >
                                            <RotateCcw className="mr-2 h-4 w-4" />
                                            Reset
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mx-auto max-w-7xl px-6 pb-8">
                    {projects.length === 0 ? (
                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-12 text-center">
                                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                                    <FolderOpen className="h-12 w-12 text-gray-400" />
                                </div>
                                <h2 className="mb-3 text-2xl font-bold text-[#212529]">No Projects Available</h2>
                                <p className="mx-auto mb-6 max-w-md text-gray-600">
                                    Get started by creating your first project. Showcase your work and organize your portfolio.
                                </p>
                                <ProjectModal />
                            </CardContent>
                        </Card>
                    ) : filteredProjects.length === 0 ? (
                        <Card className="border-0 bg-white shadow-lg">
                            <CardContent className="p-12 text-center">
                                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                                    <Search className="h-12 w-12 text-gray-400" />
                                </div>
                                <h2 className="mb-3 text-2xl font-bold text-[#212529]">No Results Found</h2>
                                <p className="mb-6 text-gray-600">No projects match your search criteria. Try adjusting your search terms.</p>
                                <Button variant="outline" onClick={() => setSearch('')} className="border-gray-300 text-gray-700 hover:bg-gray-100">
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    Clear Search
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredProjects.map((project, index) => (
                                <Card
                                    key={index}
                                    className="flex h-full transform cursor-pointer flex-col overflow-hidden border-0 bg-white p-0 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-xl"
                                >
                                    <div className="relative">
                                        <img
                                            className="h-48 w-full object-cover"
                                            src={`/storage/images/projects/${project.preview || project.logo}`}
                                            alt={project.name || 'Project preview'}
                                            onError={(e) => {
                                                e.target.src =
                                                    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjZjJmMmYyIi8+CjxwYXRoIGQ9Ik0xMiA5QzEwLjM0IDkgOSAxMC4zNCA5IDEyUzEwLjM0IDE1IDEyIDE1IDE1IDEzLjY2IDE1IDEyIDEzLjY2IDkgMTIgOVoiIGZpbGw9IiM5Y2E0YWYiLz4KPC9zdmc+';
                                            }}
                                        />
                                        <div className="absolute top-3 right-3">
                                            <img
                                                className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-lg"
                                                src={`/storage/images/projects/${project.logo}`}
                                                alt={project.name}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <CardContent className="flex-1 p-4">
                                        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-[#212529]">
                                            {project.name || 'Untitled Project'}
                                        </h3>
                                        <p className="line-clamp-2 min-h-[20px] text-sm text-gray-600">
                                            {project.description?.en ||
                                                project.description?.fr ||
                                                project.description?.ar ||
                                                'No description available'}
                                        </p>
                                    </CardContent>

                                    <CardFooter className="p-4 pt-0">
                                        <div className="flex w-full items-center justify-between gap-2">
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                    className="transform text-[#212529] transition-all duration-300 ease-in-out hover:scale-110 hover:bg-gray-100"
                                                >
                                                    <ProjectModal project={project} />
                                                </Button>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                               onClick={(e) => {
                                                e.stopPropagation()
                                                setSelectedProject(project) 
                                                setOpen(true) 
                                                }}
                                                className="transform text-[#ff7376] transition-all duration-300 ease-in-out hover:scale-110 hover:bg-[#ff7376]/10"
                                            >
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                            
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/* Modal Confirmation */}
      <Dialog open={open} onOpenChange={setOpen}>
             <DialogContent className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 ">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-center text-red-600">
              Delete Confirmation
            </DialogTitle>
          </DialogHeader>
          <p className="text-center text-gray-600">
            {selectedProject ? (
              <>Are you sure you want to delete <span className="font-semibold">{selectedProject.name}</span>? </>
            ) : (
              "No project selected."
            )}
          </p>
          <DialogFooter className="flex justify-center gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                if (selectedProject) {
                  onDeleteProject(selectedProject.id) 
                }
                setOpen(false)
                setSelectedProject(null) 
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
        </AppLayout>
    );
}
