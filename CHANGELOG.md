# [1.14.0](https://github.com/tiny-ideas-ir/lib-vue-components/compare/v1.13.0...v1.14.0) (2024-12-20)


### Features

* **modal:** add CustomModal component with customizable trigger, size, and animations ([c585495](https://github.com/tiny-ideas-ir/lib-vue-components/commit/c5854951e102a2c1e3d670c087e3cbe67fd7ce75))
* **Modal:** add Modal component with customizable properties and storybook integration ([819ad27](https://github.com/tiny-ideas-ir/lib-vue-components/commit/819ad27662ef2c1da65bf2ce9f887f40d851b916))
* **modal:** refactor CustomModal component with improved props documentation and emit handling ([94615bb](https://github.com/tiny-ideas-ir/lib-vue-components/commit/94615bb40ba3f8db2128060ce3f4f71fdd88f16d))
* **release:** allow releases to trigger from the dev branch ([40df973](https://github.com/tiny-ideas-ir/lib-vue-components/commit/40df973c82de2a36be733a41719be52a5a4f1d50))

# [1.13.0](https://github.com/tiny-ideas-ir/lib-vue-components/compare/v1.12.0...v1.13.0) (2024-12-20)


### Features

* **release:** customize semantic-release for dev branch with specific tag format ([fe59e71](https://github.com/tiny-ideas-ir/lib-vue-components/commit/fe59e71f6d5d2352fbae27252df13692d184e9d0))

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
