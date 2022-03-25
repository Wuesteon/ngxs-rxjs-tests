export interface Offer {
  hourlyRate: number;
  currency: string;
  description: string;
  technologies: string[];
}

export interface FreelancerOffer {
  freelancer: Freelancer;
  hourlyRate: number;
  currency: string;
  description: string;
  technologies: string[];
}

export interface Freelancer {
  name: string;
  id: number;
  technologies: string[];
}
