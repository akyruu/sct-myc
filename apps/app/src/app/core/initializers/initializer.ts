export interface Initializer {
  initialize(): Promise<void> | void
}

export function InitializerFactory(initializer: Initializer): () => (Promise<void> | void) {
  return () => initializer.initialize();
}
