import { mount, VueWrapper } from "@vue/test-utils";
import { 
  TransitionRoot, 
  Dialog, 
  DialogOverlay, 
  DialogPanel,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from "@headlessui/vue";
import Popper from "vue3-popper";

// Helper function to mount components with global Headless UI and Popper components
export function mountWithGlobalComponents(component: any, options: any = {}): VueWrapper<any> {
  return mount(component, {
    global: {
      components: {
        TransitionRoot,
        Dialog,
        DialogOverlay,
        DialogPanel,
        Listbox,
        ListboxButton,
        ListboxOptions,
        ListboxOption,
        Popper,
      },
      ...options.global,
    },
    ...options,
  });
}

// Export the components for direct use in tests
export {
  TransitionRoot,
  Dialog,
  DialogOverlay,
  DialogPanel,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Popper,
};