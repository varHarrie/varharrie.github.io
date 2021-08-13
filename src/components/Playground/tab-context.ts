import { InjectionKey } from 'vue';

export type TabsContext = {
  activeId: string | undefined;
  panes: Array<{ id: string; title: string }>;
  register(id: string, title: string): void;
  unregister(id: string): void;
};

export const TabsInjectionKey: InjectionKey<TabsContext> = Symbol();
