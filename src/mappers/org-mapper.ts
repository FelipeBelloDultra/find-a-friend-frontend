export interface PersistenceOrg {
  id: string;
  name: string;
  email: string;
  logo_url: string;
  phone: string;
  profile_is_completed: string;
  created_at: string;
}

export interface DomainOrg {
  id: string;
  name: string;
  email: string;
  logoUrl: string;
  phone: string;
  profileIsCompleted: string;
  createdAt: string;
}

export class OrgMapper {
  public static toDomain(fromPersistenceOrg: PersistenceOrg): DomainOrg {
    return {
      id: fromPersistenceOrg.id,
      name: fromPersistenceOrg.name,
      email: fromPersistenceOrg.email,
      logoUrl: fromPersistenceOrg.logo_url,
      phone: fromPersistenceOrg.phone,
      profileIsCompleted: fromPersistenceOrg.profile_is_completed,
      createdAt: fromPersistenceOrg.created_at,
    };
  }

  public static toPersistence(fromDomainOrg: DomainOrg): PersistenceOrg {
    return {
      id: fromDomainOrg.id,
      name: fromDomainOrg.name,
      email: fromDomainOrg.email,
      logo_url: fromDomainOrg.logoUrl,
      phone: fromDomainOrg.phone,
      profile_is_completed: fromDomainOrg.profileIsCompleted,
      created_at: fromDomainOrg.createdAt,
    };
  }
}
