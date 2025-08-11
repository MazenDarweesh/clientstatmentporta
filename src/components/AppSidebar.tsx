import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from '@/components/ui/sidebar'
import { NavLink } from 'react-router-dom'
import { Home, ListOrdered, BarChart3, Settings, Bell } from 'lucide-react'

const items = [
  { title: 'Home', url: '/', icon: Home },
  { title: 'Transactions', url: '/transactions', icon: ListOrdered },
  { title: 'Analytics', url: '/#analytics', icon: BarChart3 },
  { title: 'Notifications', url: '/#notifications', icon: Bell },
  { title: 'Settings', url: '/#settings', icon: Settings },
]

export default function AppSidebar() {
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'bg-sidebar-accent text-sidebar-foreground font-medium'
      : 'hover:bg-sidebar-accent'

  return (
    <Sidebar collapsible="offcanvas" className="border-r border-sidebar-border bg-background/60 backdrop-blur">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <ul className="flex flex-col gap-1">
              {items.map((item) => (
                <li key={item.title}>
                  <NavLink to={item.url} end className={getNavCls}>
                    {({ isActive }) => (
                      <span className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                        isActive ? 'bg-brand/10 text-brand' : 'text-foreground/80'
                      }`}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
