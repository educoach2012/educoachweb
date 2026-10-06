import {
  Award,
  BookOpen,
  Brain,
  Check,
  Clock,
  Compass,
  GraduationCap,
  Mail,
  MapPin,
  MessageCircle,
  PencilRuler,
  PenLine,
  Phone,
  Plane,
  School,
  Shield,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react"

const map: Record<string, LucideIcon> = {
  award: Award,
  bookopen: BookOpen,
  brain: Brain,
  check: Check,
  clock: Clock,
  compass: Compass,
  graduationcap: GraduationCap,
  mail: Mail,
  mappin: MapPin,
  message: MessageCircle,
  pencilruler: PencilRuler,
  penline: PenLine,
  phone: Phone,
  plane: Plane,
  school: School,
  shield: Shield,
  shieldcheck: ShieldCheck,
  sparkles: Sparkles,
  trendingup: TrendingUp,
  usercheck: UserCheck,
  users: Users,
}

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = map[name.toLowerCase()] ?? Sparkles
  return <Cmp className={className} aria-hidden="true" />
}
