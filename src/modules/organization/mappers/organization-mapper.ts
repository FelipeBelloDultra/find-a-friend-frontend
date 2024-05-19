export interface PersistenceOrganization {
  id: string;
  name: string;
  email: string;
  logo_url: string;
  phone: string;
  profile_is_completed: string;
  created_at: string;
}

export interface DomainOrganization {
  id: string;
  name: string;
  email: string;
  logoUrl: string;
  phone: string;
  profileIsCompleted: string;
  createdAt: string;
}

export class OrganizationMapper {
  public static toDomain(fromPersistenceOrganization: PersistenceOrganization): DomainOrganization {
    return {
      id: fromPersistenceOrganization.id,
      name: fromPersistenceOrganization.name,
      email: fromPersistenceOrganization.email,
      logoUrl: fromPersistenceOrganization.logo_url,
      phone: fromPersistenceOrganization.phone,
      profileIsCompleted: fromPersistenceOrganization.profile_is_completed,
      createdAt: fromPersistenceOrganization.created_at,
    };
  }

  public static toPersistence(fromDomainOrganization: DomainOrganization): PersistenceOrganization {
    return {
      id: fromDomainOrganization.id,
      name: fromDomainOrganization.name,
      email: fromDomainOrganization.email,
      logo_url: fromDomainOrganization.logoUrl,
      phone: fromDomainOrganization.phone,
      profile_is_completed: fromDomainOrganization.profileIsCompleted,
      created_at: fromDomainOrganization.createdAt,
    };
  }
}
