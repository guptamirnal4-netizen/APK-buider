import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  rightSlot?: React.ReactNode;
}

export function Header({ title, subtitle, showBack = false, rightSlot }: HeaderProps) {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-10 bg-accent text-white px-4 py-3 flex items-center gap-3 shadow-sm">
      {showBack && (
        <button
          onClick={() => navigate(-1)}
          className="text-white/90 hover:text-white -ml-1 p-1"
          aria-label="Back"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
      )}
      <div className="flex-1">
        <h1 className="font-semibold text-base leading-tight">{title}</h1>
        {subtitle && <p className="text-xs text-white/80 leading-tight mt-0.5">{subtitle}</p>}
      </div>
      {rightSlot}
    </header>
  );
}

interface BottomNavProps {
  active: "home" | "harvest" | "wrapped" | "profile";
}

export function BottomNav({ active }: BottomNavProps) {
  const navigate = useNavigate();
  const items = [
    { key: "home", label: "Home", path: "/dashboard", icon: HomeIcon },
    { key: "harvest", label: "Harvest", path: "/harvest", icon: HarvestIcon },
    { key: "wrapped", label: "Wrapped", path: "/wrapped", icon: WrappedIcon },
    { key: "profile", label: "Profile", path: "/profile", icon: ProfileIcon },
  ] as const;
  return (
    <nav className="sticky bottom-0 bg-white border-t border-gray-200 grid grid-cols-4">
      {items.map(({ key, label, path, icon: Icon }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center py-2 transition-colors ${
              isActive ? "text-accent" : "text-muted hover:text-ink"
            }`}
          >
            <Icon active={isActive} />
            <span className="text-[10px] mt-0.5 font-medium">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function HarvestIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" fill={active ? "currentColor" : "none"} />
    </svg>
  );
}
function WrappedIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" fill={active ? "currentColor" : "none"} />
    </svg>
  );
}
