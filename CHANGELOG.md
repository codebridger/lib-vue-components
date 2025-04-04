# [1.17.0-dev.17](https://github.com/codebridger/lib-vue-components/compare/dev-1.17.0-dev.16...dev-1.17.0-dev.17) (2025-04-04)


### Bug Fixes

* **FileInputCombo:** [#86](https://github.com/codebridger/lib-vue-components/issues/86)erv8ke2 update upload button visibility to prevent interaction during uploading state; enhance user experience by ensuring proper status checks ([be0cf62](https://github.com/codebridger/lib-vue-components/commit/be0cf6245bc15ae7eb26f2c8d0a3939074d00ff2)), closes [#86erv8ke2](https://github.com/codebridger/lib-vue-components/issues/86erv8ke2)


### Features

* **FileInputCombo:** [#86](https://github.com/codebridger/lib-vue-components/issues/86)erv8ke2 enhance file upload component with toast notifications for events, improve file handling with unique IDs, and update Storybook stories to demonstrate new features ([f96a06b](https://github.com/codebridger/lib-vue-components/commit/f96a06b82ff99fdae023563845ab86b3265fea40)), closes [#86erv8ke2](https://github.com/codebridger/lib-vue-components/issues/86erv8ke2)
* **FileInputCombo:** [#86](https://github.com/codebridger/lib-vue-components/issues/86)erv8ke2 enhance file upload functionality with progress tracking and error simulation; update Storybook stories to demonstrate new features and usage scenarios ([e0769b0](https://github.com/codebridger/lib-vue-components/commit/e0769b086af757e4baf50b89e05963f1f4b4d8e4)), closes [#86erv8ke2](https://github.com/codebridger/lib-vue-components/issues/86erv8ke2)
* **FileInputCombo:** [#86](https://github.com/codebridger/lib-vue-components/issues/86)erv8ke2 enhance file upload handling with comprehensive status tracking and error management; update UI to reflect upload progress and status ([488c810](https://github.com/codebridger/lib-vue-components/commit/488c8102a2d8a94a946f1d2feccb4ef2771e60fd)), closes [#86erv8ke2](https://github.com/codebridger/lib-vue-components/issues/86erv8ke2)
* **FileInputCombo:** [#86](https://github.com/codebridger/lib-vue-components/issues/86)erv8ke2 refactor file preview and upload status display using slots for better customization; enhance UI structure and maintainability ([ed3561d](https://github.com/codebridger/lib-vue-components/commit/ed3561d925488cb5acd33416205fbd3452a45041)), closes [#86erv8ke2](https://github.com/codebridger/lib-vue-components/issues/86erv8ke2)

# [1.17.0-dev.16](https://github.com/codebridger/lib-vue-components/compare/dev-1.17.0-dev.15...dev-1.17.0-dev.16) (2025-04-04)


### Bug Fixes

* **dropfile:** add storybook stories for DropFile component with various upload scenarios ([67852c6](https://github.com/codebridger/lib-vue-components/commit/67852c62bea34e2e409311f988d921931977a973))
* **dropfile:** enhance DropFile component with new upload features and mock upload support ([1ac3342](https://github.com/codebridger/lib-vue-components/commit/1ac3342f2e13fe486ad11dc59ef1efbe40094742))
* **FileInputButton:** rename FileInput component to FileInputButton component ([17e4984](https://github.com/codebridger/lib-vue-components/commit/17e4984170fe59501b2dc0eca656ef44769610d6))
* **FileInputDropMode:** rename InputFileDropMode component to FileInputDropMode component ([db308f8](https://github.com/codebridger/lib-vue-components/commit/db308f81d818256e3d9a72d29c8505a33b6a680e))
* **InputFileDragMode:** enhance file input handling by creating a temporary input element for file selection and adding duplicate file check ([42ebc47](https://github.com/codebridger/lib-vue-components/commit/42ebc47a5dd2f4f4ffbe2df9b05b933110b6e0cc))
* **InputFileDragMode:** update upload button visibility and progress display based on autoUpload prop ([25fefc8](https://github.com/codebridger/lib-vue-components/commit/25fefc8a962a4934eb2c984f9d5879db4873ab80))
* **SwitchBall:** adjust positioning and styling for RTL support; enhance label and sublabel alignment ([c342dd7](https://github.com/codebridger/lib-vue-components/commit/c342dd785c49ac84805be945ac0e286986099f1f))


### Features

* **dropfile:** add DropFile component for file uploads with drag-and-drop support ([bc4f947](https://github.com/codebridger/lib-vue-components/commit/bc4f9470d5125f05bd5b50ff2f9321e86b6e1a21))
* **dropfile:** integrate DropFile component into main export and update stories with simplified props ([b0f4537](https://github.com/codebridger/lib-vue-components/commit/b0f453729eaeb3a86326e8114c5c3e5a67a9b6c9))
* **file-input:** introduce InputFileHeadless component with file selection and preview functionality, along with Storybook stories for various use cases ([9aaf8f4](https://github.com/codebridger/lib-vue-components/commit/9aaf8f47c67f39cca2bf0ab460fc87486ee14c41))
* **FileInputCombo:** add filesStatus computed property to track file upload progress and status; update upload-area slot to include filesStatus ([b5328c5](https://github.com/codebridger/lib-vue-components/commit/b5328c51b5e07c584908433acd823807202409f5))
* **FileInputCombo:** introduce FileInputCombo component with drag-and-drop and click-to-upload functionality; includes comprehensive props for customization and Storybook stories for various use cases ([a4e51af](https://github.com/codebridger/lib-vue-components/commit/a4e51afc2b6a6f7380125cdeea66431170e1dbf0))
* **fullscreen-dropfile:** add FullscreenDropfile component with drag-and-drop functionality and Storybook stories ([2d4aa92](https://github.com/codebridger/lib-vue-components/commit/2d4aa9286e01c4c266d5fd353abbe7238737ca05))
* **icon:** add new arrow and cloud upload icons ([967ebde](https://github.com/codebridger/lib-vue-components/commit/967ebde3405d005a045327a05b5c8165fe107f81))
* **input-drag-file:** introduce InputDragFile component with drag-and-drop functionality and Storybook stories ([6f87e2b](https://github.com/codebridger/lib-vue-components/commit/6f87e2bf1df437af2dd92b1059650fda56017b0a))
* **input-file-drop-mode:** introduce InputFileDropMode component for fullscreen drag-and-drop file uploads; add associated Storybook stories for customization options ([18c7e3b](https://github.com/codebridger/lib-vue-components/commit/18c7e3b4793bc8c1f08ffff4e525c88df45c67f6))
* **input-file-headless:** enhance InputFileHeadless component with new props for file acceptance, capture, and filtering; update documentation and add new Storybook stories for image preview and file type filtering ([933c3e7](https://github.com/codebridger/lib-vue-components/commit/933c3e75accf4b85b432266d84b3f9166ecfb068))
* **InputFileDragMode:** add InputFileDragMode component for drag-and-drop file uploads; include Storybook stories for various use cases and customization options ([8744e33](https://github.com/codebridger/lib-vue-components/commit/8744e33cfa50ef2411d34f160b9ce93df3d67072))
* **InputFileHeadless:** add new props for label, placeholder, icon, and error handling; enhance Storybook stories for improved accessibility and customization options ([31dd92b](https://github.com/codebridger/lib-vue-components/commit/31dd92b3d7a8d120aac1c1dc1928c48fa5dd442d))
* **InputFileHeadless:** add showControls prop to toggle visibility of control buttons in the component; update Storybook stories accordingly ([007887c](https://github.com/codebridger/lib-vue-components/commit/007887c7d00205ec4929811fbc7f6af67dfaa60c))
* **progress:** add Progress component with customizable styles and Storybook stories for various use cases ([4c6d8d7](https://github.com/codebridger/lib-vue-components/commit/4c6d8d7b7dfa98e635aaae0e06dc7186225001e4))
* **static-icons:** add IconCheck component and include it in the StatusAndIndicators export ([b43fa9b](https://github.com/codebridger/lib-vue-components/commit/b43fa9bc76dbe6d7b62fabf37f59ac8aa822e0f9))
* **SwitchBall:** add SwitchBall component with customizable labels, colors, and icons; include Storybook stories for various use cases ([32239bc](https://github.com/codebridger/lib-vue-components/commit/32239bc3f4e30af2dfc2c8df26c31ea0e832f27f))

# [1.17.0-dev.15](https://github.com/codebridger/lib-vue-components/compare/dev-1.17.0-dev.14...dev-1.17.0-dev.15) (2025-03-16)


### Bug Fixes

* **branding:** Allow dynamic brand logo in DashboardShell and SidebarMenu components ([db70f0a](https://github.com/codebridger/lib-vue-components/commit/db70f0a6c444ccdaf88aa63781fbaa39742949e3))

# [1.17.0-dev.14](https://github.com/codebridger/lib-vue-components/compare/dev-1.17.0-dev.13...dev-1.17.0-dev.14) (2025-03-14)


### Bug Fixes

* **tabs:**  Divide Width Equally Between Objects ([f7c4a7a](https://github.com/codebridger/lib-vue-components/commit/f7c4a7a6f11004e50cab143193dacdc309a0b937))
* **tabs:** Add source type to tab story for better documentation ([d78210c](https://github.com/codebridger/lib-vue-components/commit/d78210c8058bf48ea73a4633f69c4f027bf6ed23))
* **tabs:** add tab component and change text tab color ([12040f8](https://github.com/codebridger/lib-vue-components/commit/12040f875d31dc65c8c03bae6f8d4b23b7128ef9))


### Features

* **tabs:** Implementing a Tabs Component ([d4a8578](https://github.com/codebridger/lib-vue-components/commit/d4a85785ddf3216aa7e0a0db16fc356b708eb890))

# [1.15.0](https://github.com/codebridger/lib-vue-components/compare/v1.14.1...v1.15.0) (2025-03-09)


### Bug Fixes

* **button:** add color default to button component ([87f2494](https://github.com/codebridger/lib-vue-components/commit/87f24943b12cf2a8bc0683053dfc71f7d718e3f3))
* **button:** Checking Cursor on Button component when it has link ([9ff709c](https://github.com/codebridger/lib-vue-components/commit/9ff709c3f14918002820fca20962574851ff9303))
* **button:** Checking disabled on Button component when it is a tag ([934e3b8](https://github.com/codebridger/lib-vue-components/commit/934e3b8278d07fee2102ff6915f5895fcff20766))
* **button:** Checking Onclick and disabled for button and a tag ([d5bdcb9](https://github.com/codebridger/lib-vue-components/commit/d5bdcb95ae822d6a213eb175d16316397b96b2ab))
* **button:** resolve Deprecation Warning darken function ([3be9a7a](https://github.com/codebridger/lib-vue-components/commit/3be9a7a745653148061f84dc1aca357656637764))
* **button:** resolve Deprecation Warning darken function to color.adjust ([546399a](https://github.com/codebridger/lib-vue-components/commit/546399ae9fd4dcf8ddbcbdd2e3f113e6af8f18bb))
* **card:** check bg color if it has not bg ([acd11bc](https://github.com/codebridger/lib-vue-components/commit/acd11bcd1ff48ca26c44a334ddfb27e6baa8639d))
* **iconbutton:** add transition ([93bb8f8](https://github.com/codebridger/lib-vue-components/commit/93bb8f8b46dc65fdf26caffe9bae3859f194092c))
* **input:** Adding TelInput to input story ([5a2894d](https://github.com/codebridger/lib-vue-components/commit/5a2894d01707064dbea764dc48626ce258b28259))
* **input:** Checking rtl or ltr for icon in input ([6f859ea](https://github.com/codebridger/lib-vue-components/commit/6f859ea263ac9deebe2036f19fc7a5c6cb7ab7f2))
* **modal:** add button component ([54c812a](https://github.com/codebridger/lib-vue-components/commit/54c812a64810f6d992cfd8a2d2260016eed46df0))
* **pagination:** Remove totalItems and itemsPerPage ([b694599](https://github.com/codebridger/lib-vue-components/commit/b6945995e3e9147e6f2db80fafc7b7c275c51755))


### Features

* add right arrow icon and update left arrow icon SVG structure ([c26147b](https://github.com/codebridger/lib-vue-components/commit/c26147b71bf4770a277ed3684e7e184890bf06eb))
* **button:** add icon option to input component ([be9af0a](https://github.com/codebridger/lib-vue-components/commit/be9af0af83dc4465d8038f412bb45f52225647f7))
* **pagination:** Implementing a Pagination Component ([b182fbe](https://github.com/codebridger/lib-vue-components/commit/b182fbeddc0da716cd7fb2ca3eb75bc2b16e864e))
* **textarea:** add label option to textarea component ([ae84fab](https://github.com/codebridger/lib-vue-components/commit/ae84fab83a18a82b8dc1f93406c34ddd7edc0737))

# [1.17.0-dev.13](https://github.com/codebridger/lib-vue-components/compare/dev-1.17.0-dev.12...dev-1.17.0-dev.13) (2025-03-09)

### Bug Fixes

* **button:** add color default to button component ([87f2494](https://github.com/codebridger/lib-vue-components/commit/87f24943b12cf2a8bc0683053dfc71f7d718e3f3))
* **card:** check bg color if it has not bg ([acd11bc](https://github.com/codebridger/lib-vue-components/commit/acd11bcd1ff48ca26c44a334ddfb27e6baa8639d))
* **iconbutton:** add transition ([93bb8f8](https://github.com/codebridger/lib-vue-components/commit/93bb8f8b46dc65fdf26caffe9bae3859f194092c))
* **modal:** add button component ([54c812a](https://github.com/codebridger/lib-vue-components/commit/54c812a64810f6d992cfd8a2d2260016eed46df0))
* **pagination:** Remove totalItems and itemsPerPage ([b694599](https://github.com/codebridger/lib-vue-components/commit/b6945995e3e9147e6f2db80fafc7b7c275c51755))


### Features

* **pagination:** Implementing a Pagination Component ([b182fbe](https://github.com/codebridger/lib-vue-components/commit/b182fbeddc0da716cd7fb2ca3eb75bc2b16e864e))

# [1.17.0-dev.12](https://github.com/codebridger/lib-vue-components/compare/dev-1.17.0-dev.11...dev-1.17.0-dev.12) (2025-03-03)


### Bug Fixes

* **input:** Adding TelInput to input story ([5a2894d](https://github.com/codebridger/lib-vue-components/commit/5a2894d01707064dbea764dc48626ce258b28259))
* **input:** Checking rtl or ltr for icon in input ([6f859ea](https://github.com/codebridger/lib-vue-components/commit/6f859ea263ac9deebe2036f19fc7a5c6cb7ab7f2))


### Features

* **button:** add icon option to input component ([be9af0a](https://github.com/codebridger/lib-vue-components/commit/be9af0af83dc4465d8038f412bb45f52225647f7))
* **textarea:** add label option to textarea component ([ae84fab](https://github.com/codebridger/lib-vue-components/commit/ae84fab83a18a82b8dc1f93406c34ddd7edc0737))

# [1.17.0-dev.11](https://github.com/codebridger/lib-vue-components/compare/dev-1.17.0-dev.10...dev-1.17.0-dev.11) (2025-03-03)


### Bug Fixes

* **button:** Checking Cursor on Button component when it has link ([9ff709c](https://github.com/codebridger/lib-vue-components/commit/9ff709c3f14918002820fca20962574851ff9303))
* **button:** Checking disabled on Button component when it is a tag ([934e3b8](https://github.com/codebridger/lib-vue-components/commit/934e3b8278d07fee2102ff6915f5895fcff20766))
* **button:** Checking Onclick and disabled for button and a tag ([d5bdcb9](https://github.com/codebridger/lib-vue-components/commit/d5bdcb95ae822d6a213eb175d16316397b96b2ab))
* **button:** resolve Deprecation Warning darken function ([3be9a7a](https://github.com/codebridger/lib-vue-components/commit/3be9a7a745653148061f84dc1aca357656637764))
* **button:** resolve Deprecation Warning darken function to color.adjust ([546399a](https://github.com/codebridger/lib-vue-components/commit/546399ae9fd4dcf8ddbcbdd2e3f113e6af8f18bb))

# [1.17.0-dev.10](https://github.com/codebridger/lib-vue-components/compare/dev-1.17.0-dev.9...dev-1.17.0-dev.10) (2025-03-02)


### Features

* add right arrow icon and update left arrow icon SVG structure ([c26147b](https://github.com/codebridger/lib-vue-components/commit/c26147b71bf4770a277ed3684e7e184890bf06eb))

# [1.17.0-dev.9](https://github.com/codebridger/lib-vue-components/compare/dev-1.17.0-dev.8...dev-1.17.0-dev.9) (2025-03-01


### Bug Fixes

* update package name references from [@tiny-ideas-ir](https://github.com/tiny-ideas-ir) to [@codebridger](https://github.com/codebridger) ([57f6178](https://github.com/codebridger/lib-vue-components/commit/57f6178bf7bb8a3853b13a6ce64223c1c545d6ed))

# [1.17.0-dev.8](https://github.com/codebridger/lib-vue-components/compare/dev-1.17.0-dev.7...dev-1.17.0-dev.8) (2025-03-01)


### Bug Fixes

* **Button:** publish previous changes ([aad26e9](https://github.com/codebridger/lib-vue-components/commit/aad26e9de0fd01865dbee2d00aa448635358c7b9))

# [1.17.0-dev.7](https://github.com/tiny-ideas-ir/lib-vue-components/compare/dev-1.17.0-dev.6...dev-1.17.0-dev.7) (2025-02-04)


### Features

* **release:** conditionally apply changelog generation for main branch ([aec0db3](https://github.com/tiny-ideas-ir/lib-vue-components/commit/aec0db3cd293e82fd5c33d5945c65d20ba4cab0d))

# [1.17.0-dev.6](https://github.com/tiny-ideas-ir/lib-vue-components/compare/dev-1.17.0-dev.5...dev-1.17.0-dev.6) (2025-02-04)


### Features

* update story titles and enhance documentation structure ([13d7f5f](https://github.com/tiny-ideas-ir/lib-vue-components/commit/13d7f5f4286a1119077bdf5de87bb678a63a23c9))

# [1.17.0-dev.5](https://github.com/tiny-ideas-ir/lib-vue-components/compare/dev-1.17.0-dev.4...dev-1.17.0-dev.5) (2024-12-30)


### Bug Fixes

* **Card:** make cardDisabled injection optional in child components ([059fb86](https://github.com/tiny-ideas-ir/lib-vue-components/commit/059fb86b2636d01e00490392fcf68581ae8c6a2b))
* simplify cardDisabled handling in form elements ([3f7753b](https://github.com/tiny-ideas-ir/lib-vue-components/commit/3f7753bb0b4fcdb7c7492da17da59b1fa8605071))

# [1.17.0-dev.4](https://github.com/tiny-ideas-ir/lib-vue-components/compare/dev-1.17.0-dev.3...dev-1.17.0-dev.4) (2024-12-30)


### Features

* **Button:** Add active effect ([425514a](https://github.com/tiny-ideas-ir/lib-vue-components/commit/425514a2a7ce6dfec3e378aba82e60d095621e34))
* **Button:** Add loading with different variation ([3565082](https://github.com/tiny-ideas-ir/lib-vue-components/commit/35650829479297dfe9a85e6b820baf5008bb3d61))
* **Button:** Add span loading on click button ([2f8dc45](https://github.com/tiny-ideas-ir/lib-vue-components/commit/2f8dc450ac3a02a538d76421ce9b0eb3d4925800))

# [1.17.0-dev.3](https://github.com/tiny-ideas-ir/lib-vue-components/compare/dev-1.17.0-dev.2...dev-1.17.0-dev.3) (2024-12-26)


### Bug Fixes

* **Modal:** make modelValue prop optional ([99c8855](https://github.com/tiny-ideas-ir/lib-vue-components/commit/99c88557bb4824e4f9e24f91ea5eeebf514e823b))


### Features

* **Button:** add borderType prop with options for solid, dashed, and dotted ([4f5bc7a](https://github.com/tiny-ideas-ir/lib-vue-components/commit/4f5bc7aab91c750a35cfc7ce0b65411c2638b43e))
* **Modal:** add verticalPosition prop to control modal alignment ([ef96f40](https://github.com/tiny-ideas-ir/lib-vue-components/commit/ef96f4070cfe686674a2eead8524866d3477c68b))

# [1.17.0-dev.2](https://github.com/tiny-ideas-ir/lib-vue-components/compare/dev-1.17.0-dev.1...dev-1.17.0-dev.2) (2024-12-24)


### Features

* **DashboardShell:** enhance content slot with dynamic size and provide contentSize context ([d478a3e](https://github.com/tiny-ideas-ir/lib-vue-components/commit/d478a3e51ca08696f603174410674fe870e1ae8c))

# [1.17.0-dev.1](https://github.com/tiny-ideas-ir/lib-vue-components/compare/dev-1.16.0...dev-1.17.0-dev.1) (2024-12-24)


### Features

* **release:** Merge branch 'main' into dev ([d42ccc0](https://github.com/tiny-ideas-ir/lib-vue-components/commit/d42ccc01aa2af63a08514e4c582b14b79cdba787))

# [1.13.0](https://github.com/tiny-ideas-ir/lib-vue-components/compare/v1.12.0...v1.13.0) (2024-12-24)


### Bug Fixes

* **Card:** improve cardDisabled state propagation to child components ([b679890](https://github.com/tiny-ideas-ir/lib-vue-components/commit/b679890951c38929b41a925732859bb05e156e20))
* **imports:** update import paths for useAppStore and Icon component in SidebarMenu and ThemeCustomizer ([19f505d](https://github.com/tiny-ideas-ir/lib-vue-components/commit/19f505d3c70ad03a1a51917889bf1a35ca8f2ac0))
* **package:** update version to 1.14.0 ([15f8dfc](https://github.com/tiny-ideas-ir/lib-vue-components/commit/15f8dfc55330385ff5ee356cd1b2faa662cc8d3f))
* **release:** add 'dev' branch to release configuration ([8e70b77](https://github.com/tiny-ideas-ir/lib-vue-components/commit/8e70b77e3922d04c505693f77324fdcfdc4da691))
* **release:** correct tag format syntax in release workflow ([fd6efcd](https://github.com/tiny-ideas-ir/lib-vue-components/commit/fd6efcde8321a10146cba1037d3802cde6f0eccd))
* **release:** escape variable in tag format for semantic-release ([dc10021](https://github.com/tiny-ideas-ir/lib-vue-components/commit/dc1002119228d08c33d7d8232e8c31922da26506))
* **release:** update version to 0.0.0 and add tag configuration for semantic-release ([83ac589](https://github.com/tiny-ideas-ir/lib-vue-components/commit/83ac589da350be6c77841ac831155f94ee07eaba))
* update deploy condition to trigger only on successful main branch workflows ([b06ae64](https://github.com/tiny-ideas-ir/lib-vue-components/commit/b06ae64f56411bd9ae6889badc8e21c4695be41e))


### Features

* add toggleModal functionality to slots in Modal component ([d645a10](https://github.com/tiny-ideas-ir/lib-vue-components/commit/d645a10dabff1fafafb46b9abd98375360873f69))
* **Card:** add autodocs tag to Card component stories ([ab464ce](https://github.com/tiny-ideas-ir/lib-vue-components/commit/ab464ceb08a110ac3dd220e5413cea87a5699e2a))
* **Card:** enhance Card component with customizable classes and add source documentation ([a289b39](https://github.com/tiny-ideas-ir/lib-vue-components/commit/a289b395a51ec0a200255a85f9286e6167482d47))
* **Card:** Implement Card component ([abc223f](https://github.com/tiny-ideas-ir/lib-vue-components/commit/abc223fc7e17dcefa528f90eb0b47f79cb8f04b3))
* **Card:** Implement Card component - inprogress ([bc0b81c](https://github.com/tiny-ideas-ir/lib-vue-components/commit/bc0b81c01f89a47e46b488f005c2a7f4fa919fb6))
* **Card:** update CardWithInput story to include disabled state and enhance documentation ([7678f88](https://github.com/tiny-ideas-ir/lib-vue-components/commit/7678f88b0e446871844241c66db8386e7525f41f))
* **icon:** refactor icon components to use a unified Icon component and update ThemeCustomizer ([a76068a](https://github.com/tiny-ideas-ir/lib-vue-components/commit/a76068a14d54921e4a8fbdbf6d0c72d6662126b3))
* **icon:** update icon components and add icon gallery documentation ([9f87fa2](https://github.com/tiny-ideas-ir/lib-vue-components/commit/9f87fa20c6f4169e10b14609612cb5187bb13a91))
* **modal:** add CustomModal component with customizable trigger, size, and animations ([c585495](https://github.com/tiny-ideas-ir/lib-vue-components/commit/c5854951e102a2c1e3d670c087e3cbe67fd7ce75))
* **Modal:** add Modal component with customizable properties and storybook integration ([819ad27](https://github.com/tiny-ideas-ir/lib-vue-components/commit/819ad27662ef2c1da65bf2ce9f887f40d851b916))
* **modal:** refactor CustomModal component with improved props documentation and emit handling ([94615bb](https://github.com/tiny-ideas-ir/lib-vue-components/commit/94615bb40ba3f8db2128060ce3f4f71fdd88f16d))
* **release:** allow releases to trigger from the dev branch ([40df973](https://github.com/tiny-ideas-ir/lib-vue-components/commit/40df973c82de2a36be733a41719be52a5a4f1d50))
* **release:** conditionally apply changelog generation for main branch ([aec0db3](https://github.com/tiny-ideas-ir/lib-vue-components/commit/aec0db3cd293e82fd5c33d5945c65d20ba4cab0d))
* **release:** customize semantic-release for dev branch with specific tag format ([fe59e71](https://github.com/tiny-ideas-ir/lib-vue-components/commit/fe59e71f6d5d2352fbae27252df13692d184e9d0))
* **toast:** add Storybook stories and documentation for toast utility functions ([ee4b6e4](https://github.com/tiny-ideas-ir/lib-vue-components/commit/ee4b6e4704074942d0111bab3e3e49b65ca299f8))
* **toast:** implement toast utility functions using SweetAlert2 ([bab7494](https://github.com/tiny-ideas-ir/lib-vue-components/commit/bab749480fbd09a4dddc4f29e46b3692d4b670f7))

# [1.12.0](https://github.com/tiny-ideas-ir/lib-vue-components/compare/v1.11.0...v1.12.0) (2024-12-14)


### Features

* **avatar-group:** make hoverAnimation prop optional for better flexibility ([afcb1e3](https://github.com/tiny-ideas-ir/lib-vue-components/commit/afcb1e328f897d94457fc989dc0b18cf2cfc1938))
* **dropdown:** enhance Dropdown component with customizable trigger and body wrapper classes ([347116a](https://github.com/tiny-ideas-ir/lib-vue-components/commit/347116afcd38ced078b2a8d111af2f7a65b504cc))

# [1.11.0](https://github.com/tiny-ideas-ir/lib-vue-components/compare/v1.10.0...v1.11.0) (2024-12-12)


### Features

* **dashboard:** add hideMenu control to storybook for better UI testing ([4652986](https://github.com/tiny-ideas-ir/lib-vue-components/commit/4652986fa8a742850dbd944b28c0fb8e68c53074))

# [1.10.0](https://github.com/tiny-ideas-ir/lib-vue-components/compare/v1.9.0...v1.10.0) (2024-12-12)


### Features

* **dashboard:** update brand title and add hideMenu prop for improved UI control ([ed7df1b](https://github.com/tiny-ideas-ir/lib-vue-components/commit/ed7df1ba266fac878ddd849ad13c2ccb72bcfefc))

# [1.9.0](https://github.com/tiny-ideas-ir/lib-vue-components/compare/v1.8.0...v1.9.0) (2024-12-11)


### Features

* **store:** add computed property for RTL support in app store ([8e84b54](https://github.com/tiny-ideas-ir/lib-vue-components/commit/8e84b548dbe0d527b50c38402e7a43856168cc67))

# [1.8.0](https://github.com/tiny-ideas-ir/lib-vue-components/compare/v1.7.0...v1.8.0) (2024-12-08)


### Features

* **types:** introduce AppSettingType and PluginOptionsType for improved type safety ([59d9835](https://github.com/tiny-ideas-ir/lib-vue-components/commit/59d98353b104a9972b9328d92dfa5d25d5ef48ef))

# [1.7.0](https://github.com/tiny-ideas-ir/lib-vue-components/compare/v1.6.0...v1.7.0) (2024-12-08)


### Features

* **AppSetting:** enhance initialization with configurable options and add animation type support ([6bdc087](https://github.com/tiny-ideas-ir/lib-vue-components/commit/6bdc0871c195b3cc4040e1956ae2e44736ac306f))
* **nuxt:** extend defineNuxtPlugin options to include AppSetting ([2810a8f](https://github.com/tiny-ideas-ir/lib-vue-components/commit/2810a8f69469c18a8f2512b10070f243736b20c1))
* **theme:** remove deprecated theme configuration file ([a6cae5d](https://github.com/tiny-ideas-ir/lib-vue-components/commit/a6cae5deaec6610a5a736a4491f0b951d918d343))

# [1.6.0](https://github.com/tiny-ideas-ir/lib-vue-components/compare/v1.5.0...v1.6.0) (2024-12-07)


### Bug Fixes

* **Dropdown:** convert offsetSkid, offsetDistance, and arrowPadding to strings for proper binding ([df5fc03](https://github.com/tiny-ideas-ir/lib-vue-components/commit/df5fc03529904eef417b0c5883e5d26ea7b5196d))
* **package.json:** correct import and types paths for nuxt and vue ([5a24f65](https://github.com/tiny-ideas-ir/lib-vue-components/commit/5a24f654824078b320f5a7d1b6c94fa228430899))


### Features

* **DashboardShell:** refactor header structure and remove Header component; add header slot support ([f437435](https://github.com/tiny-ideas-ir/lib-vue-components/commit/f437435d89597786ed0beb2dba51b9737cba28ed))
* **FileInput:** enhance component with computed button color and streamline event emissions ([99ed16c](https://github.com/tiny-ideas-ir/lib-vue-components/commit/99ed16cc4194391a762f7a325b0f2c200125b399))
* **FileInput:** Implement FileInput component ([b4f424d](https://github.com/tiny-ideas-ir/lib-vue-components/commit/b4f424d6b2cc4ed13bf8a4eb4b5de7c2cd3d6779))
* **IconButton:** update default props for rounded and size; enhance image handling in rendering ([2493f0a](https://github.com/tiny-ideas-ir/lib-vue-components/commit/2493f0abb1a6450962e9a17679461386e61f4665))
* **Input:** Add Error Msg and delete file type ([e5910b8](https://github.com/tiny-ideas-ir/lib-vue-components/commit/e5910b8a583ec5f32f3f4681219f67695e573ab6))
* **Input:** Implement Input component for all types of input ([2a03d24](https://github.com/tiny-ideas-ir/lib-vue-components/commit/2a03d24f781f7eb322a55a4e125b5703fdc41b6f))
* **Input:** refactor input class binding for improved readability and maintainability ([62522d0](https://github.com/tiny-ideas-ir/lib-vue-components/commit/62522d02005d83518f702d520d33d72dab965957))
* restructure component exports and update DashboardShell markup ([02f7f0b](https://github.com/tiny-ideas-ir/lib-vue-components/commit/02f7f0b93e20323308032fdc04b6fb9460687d38))
* **sidebarMenu:** improve UX and active state. ([222d403](https://github.com/tiny-ideas-ir/lib-vue-components/commit/222d403d66a93034c8bd91d955ce84b829abc5d3))
* **TextArea:** Add error state and Error Msg ([1437251](https://github.com/tiny-ideas-ir/lib-vue-components/commit/14372511de149a8e376b6aceeda7686d749e03eb))
* **TextArea:** Implement TextArea component ([8f46389](https://github.com/tiny-ideas-ir/lib-vue-components/commit/8f463893f9f75299ef39df92943ad8adf8a62369))
* update Button and Dropdown components to make label and triggerText optional; refactor DashboardShell markup and IconButton import ([ea9e40d](https://github.com/tiny-ideas-ir/lib-vue-components/commit/ea9e40d388b2dea3680b76975862494e6e8501ab))
* update package exports and add types for all project interfaces ([a357771](https://github.com/tiny-ideas-ir/lib-vue-components/commit/a3577711b96ce869b25da7d4b1d9822fa96575b7))
* update package exports and add types for all project interfaces ([be0dfb1](https://github.com/tiny-ideas-ir/lib-vue-components/commit/be0dfb1069815cc6d7c54144da8a1470bf402a56))
* update package.json to include src directory and correct types path ([9e6bcae](https://github.com/tiny-ideas-ir/lib-vue-components/commit/9e6bcae7cc57bd87b3e081a108579dcc59f8c36f))

# [1.5.0](https://github.com/tiny-ideas-ir/lib-vue-components/compare/v1.4.0...v1.5.0) (2024-12-02)


### Features

* **IconButton:** add imgUrl prop and update rendering logic; enhance ProfileMenu with IconButton ([619cdd8](https://github.com/tiny-ideas-ir/lib-vue-components/commit/619cdd8a8c192f3cca0503bd525e32e38a04229c))

# [1.4.0](https://github.com/tiny-ideas-ir/lib-vue-components/compare/v1.3.1...v1.4.0) (2024-12-02)


### Features

* **Avatar:** Add new peops in Avatar component ([fc9ea14](https://github.com/tiny-ideas-ir/lib-vue-components/commit/fc9ea142fc185b9a5b6a3140f11996a43705824a))
* **AvatarGroup:** add hover animation support and update stories ([9eb4bec](https://github.com/tiny-ideas-ir/lib-vue-components/commit/9eb4bec8a5f76808d3bd80f3229b81ead47be317))
* **AvatarGroup:** Add slot in AvatarGroup component ([77957c8](https://github.com/tiny-ideas-ir/lib-vue-components/commit/77957c8ddba710e18a440d2a052b5d8fa375cf61))
* **AvatarGroup:** Implament AvatarGroup component ([9a10392](https://github.com/tiny-ideas-ir/lib-vue-components/commit/9a10392f28dc7283cded83756cc3c07b8de60bce))
* **Avatar:** Implament Avatar component ([c5d980d](https://github.com/tiny-ideas-ir/lib-vue-components/commit/c5d980d1a176bba00ea3fd169ba95fc1a6fb3881))
* **Dropdown:** add Dropdown and DropdownItem components with customizable properties ([dd30f03](https://github.com/tiny-ideas-ir/lib-vue-components/commit/dd30f0321bc7b7ef06ec914edfb87225f0b3aac7))
* **Dropdown:** implement Dropdown component with customizable properties and stories ([7b3f892](https://github.com/tiny-ideas-ir/lib-vue-components/commit/7b3f892851b1584c03439a8204e603dc0342f721))
* **Dropdown:** update ProfileMenu story with custom trigger and improved layout ([388a397](https://github.com/tiny-ideas-ir/lib-vue-components/commit/388a397fdbc3110aeef62a200e6d2f9bc1a2d55f))
* **Fonts:** add Nunito font styles and update CSS imports ([7185f44](https://github.com/tiny-ideas-ir/lib-vue-components/commit/7185f44d28f24f425b9b30f8efce6c450eef1816))

## [1.3.1](https://github.com/tiny-ideas-ir/lib-vue-components/compare/v1.3.0...v1.3.1) (2024-11-30)


### Bug Fixes

* **HorizontalMenu:** add comment for root item in menu structure ([c1fb635](https://github.com/tiny-ideas-ir/lib-vue-components/commit/c1fb63546826dfedb591305d397948931beb08ee))

# [1.3.0](https://github.com/tiny-ideas-ir/lib-vue-components/compare/v1.2.0...v1.3.0) (2024-11-30)


### Features

* **DashboardShell:** enhance layout with responsive horizontal menu and add full setup story ([0bd5048](https://github.com/tiny-ideas-ir/lib-vue-components/commit/0bd5048fb3bfc1c9076733e3a35911f501c87b36))
* **DashboardShell:** integrate Button component and enhance sidebar menu layout ([81964bd](https://github.com/tiny-ideas-ir/lib-vue-components/commit/81964bda406182af3ae9d5c7ec68a9b871ce2545))
* **SidebarMenu:** add title prop and update layout for brand slot ([b61cad7](https://github.com/tiny-ideas-ir/lib-vue-components/commit/b61cad70c761f70c41056d0d034ee1e3ba4e0136))

# [1.2.0](https://github.com/tiny-ideas-ir/lib-vue-components/compare/v1.1.2...v1.2.0) (2024-11-27)


### Features

* fix export issue of styles, and a few slot changes. ([bb0f876](https://github.com/tiny-ideas-ir/lib-vue-components/commit/bb0f876cdf4a835105aa8f5ff5769e7a3a424401))

## [1.1.2](https://github.com/tiny-ideas-ir/lib-vue-components/compare/v1.1.1...v1.1.2) (2024-11-10)


### Bug Fixes

* fix installing issues over nuxt framework ([3cee99f](https://github.com/tiny-ideas-ir/lib-vue-components/commit/3cee99f1d76e1d2cf16ca88700ffe42719cd3176))

## [1.1.1](https://github.com/tiny-ideas-ir/lib-vue-components/compare/v1.1.0...v1.1.1) (2024-11-09)


### Bug Fixes

* adding proper app shell components to export list. ([12c96b7](https://github.com/tiny-ideas-ir/lib-vue-components/commit/12c96b76be36bd51d52e31059d5855081cd31b0d))

# [1.1.0](https://github.com/tiny-ideas-ir/lib-vue-components/compare/v1.0.0...v1.1.0) (2024-11-02)


### Features

* **HorizontalMenu:** Implemented Horizontal menu. ([3044595](https://github.com/tiny-ideas-ir/lib-vue-components/commit/3044595d148f9606723a18c5b9053a74b41bd8ba))

# 1.0.0 (2024-10-26)


### Features

* release first version ([1a79f73](https://github.com/tiny-ideas-ir/lib-vue-components/commit/1a79f7338f33a329fc6e1975fe3d957f6bca8817))
