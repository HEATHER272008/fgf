import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import teamMinion from '@/assets/team-minion.png';

interface TeamMember {
  name: string;
  role: string;
  photo?: string;
  quote: string;
  facebook: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Jermaine Summer Segundo',
    role: 'Research Leader',
    photo: 'https://cdn.phototourl.com/uploads/2026-01-26-6c30ac70-e484-4bd2-b95b-a26fff8fb102.jpg',
    quote: '"The future belongs to those who believe in the beauty of their dreams."<br>— Eleanor Roosevelt',
    facebook: 'https://www.facebook.com/sum.segundo.2024',
  },
  {
    name: 'Mark Emman Lopez',
    role: 'Developer / Second Author',
    photo: 'https://cdn.phototourl.com/uploads/2026-01-26-5953ebb5-e46e-49bc-9d84-faef94f1f826.jpg',
    quote:`“You can't blame gravity for falling in love.”<br>— Albert Einstein`,
    facebook: 'https://www.facebook.com/markemman.lopez/',
  },
  {
    name: 'Edrian Rheine Baugan',
    role: 'Third Author',
    photo: 'https://cdn.phototourl.com/uploads/2026-01-26-638810d5-1f2e-4bc1-b4e8-9c3ebe7cf57c.jpg',
    quote: '"To love oneself is the beginning of a lifelong romance."<br>— Oscar Wilde',
    facebook: 'https://www.facebook.com/edrian.rheine',
  },
  {
    name: 'Samuel Jr. De Guzman',
    role: 'Fourth Author',
    photo: 'https://cdn.phototourl.com/uploads/2026-01-26-05c9cdae-2c3a-46a1-bfd6-548942ce9648.jpg',
    quote: '"The greatest glory in living lies not in never falling, but in rising every time we fall."<br>— Nelson Mandela',
    facebook: 'https://www.facebook.com/samuel.de.guzman.741898',
  },
  {
    name: 'Jake Raizain Bambao',
    role: 'Fifth Author',
    photo: 'https://cdn.phototourl.com/uploads/2026-01-26-037f0f57-7d8d-4faf-864d-116e2d2ae32e.jpg',
    quote: '"To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment."<br>— Ralph Waldo Emerson',
    facebook: 'https://www.facebook.com/jakeraizain.bambao',
  },
];

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TeamModal = ({ isOpen, onClose }: TeamModalProps) => {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  const handleCardClick = (facebook: string) => {
    window.open(facebook, '_blank', 'noopener,noreferrer');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[95vw] max-w-[650px] max-h-[90vh] p-0 gap-0 overflow-hidden rounded-3xl border-0 shadow-2xl [&>button]:hidden flex flex-col bg-background">
        {/* Header */}
        <DialogHeader className="flex-shrink-0 bg-gradient-to-br from-primary to-primary/80 p-5 text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
              <img src={teamMinion} alt="Team" className="w-12 h-12 object-contain" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-white">
                Development Team
              </DialogTitle>
              <p className="text-white/80 text-sm">
                The people behind CathoLink
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* Team Members Grid */}
        <div className="flex-1 overflow-y-auto p-5 bg-background">
          <p className="text-xs text-muted-foreground text-center mb-5">
            Tap a card to view developer profile
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="relative group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredMember(member.name)}
                onMouseLeave={() => setHoveredMember(null)}
                onTouchStart={() => setHoveredMember(member.name)}
                onTouchEnd={() => setTimeout(() => setHoveredMember(null), 2000)}
                onClick={() => handleCardClick(member.facebook)}
              >
                <div className="bg-card border border-border rounded-2xl p-4 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center h-full">
                  {/* Circular Avatar */}
                  <div className="w-20 h-20 rounded-full bg-muted border-2 border-primary/20 flex items-center justify-center overflow-hidden mb-3 group-hover:border-primary/50 group-hover:scale-105 transition-all duration-300">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-primary font-bold text-xl">
                        {getInitials(member.name)}
                      </span>
                    )}
                  </div>
                  
                  {/* Name */}
                  <p className="font-semibold text-foreground text-sm leading-tight mb-1">
                    {member.name}
                  </p>
                  
                  {/* Role */}
                  <p className="text-xs text-primary font-medium">
                    {member.role}
                  </p>
                  
                  {/* External link indicator on hover */}
                  <ExternalLink className="h-3 w-3 text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                {/* Quote overlay on hover */}
                <div 
                  className={`absolute inset-0 bg-primary/95 rounded-2xl p-3 flex flex-col items-center justify-center text-center transition-all duration-300 ${
                    hoveredMember === member.name 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-95 pointer-events-none'
                  }`}
                >
                  <p
                    className="text-primary-foreground text-xs italic leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: member.quote }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 p-4 bg-background border-t border-border">
          <Button onClick={onClose} variant="outline" className="w-full rounded-xl">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeamModal;
