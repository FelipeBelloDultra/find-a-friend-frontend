export type Optional<Type, KeyType extends keyof Type> = Pick<Partial<Type>, KeyType> &
  Omit<Type, KeyType>;
