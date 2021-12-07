export interface Property {
  id: string;
  communityId: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  community: Community;
}

export interface Community {
  id: string
  name: string
  avatar: string
}
