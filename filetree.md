# File Tree: lasuhealth

Generated on: 8/13/2025, 3:55:42 PM
Root path: `c:\Users\ORIGOLD\oridev\origold\lasuhealth`

```
├── 📁 .git/ 🚫 (auto-hidden)
├── 📁 .next/ 🚫 (auto-hidden)
├── 📁 .vscode/ 🚫 (auto-hidden)
├── 📁 app/
│   ├── 📁 (auth)/
│   │   ├── 📁 complete-signup/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 forgot-password/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 login/
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 medical-registration/
│   │   │   ├── 📄 allergies.tsx
│   │   │   ├── 📄 medical-history.tsx
│   │   │   ├── 📄 page.tsx
│   │   │   ├── 📄 parent-info.tsx
│   │   │   ├── 📄 password.tsx
│   │   │   └── 📄 student-info.tsx
│   │   └── 📄 layout.tsx
│   ├── 📁 (protected)/
│   │   ├── 📁 _components/
│   │   │   └── 📄 protected-layout.tsx
│   │   ├── 📁 staff/
│   │   │   ├── 📁 dashboard/
│   │   │   │   ├── 📄 active-students.tsx
│   │   │   │   ├── 📄 age-sex-visit.tsx
│   │   │   │   ├── 📄 faculty-dept-visit.tsx
│   │   │   │   ├── 📄 monthly-attendance-chart.tsx
│   │   │   │   ├── 📄 montly-visit.tsx
│   │   │   │   ├── 📄 top-10-diagnosis.tsx
│   │   │   │   └── 📄 total-records.tsx
│   │   │   ├── 📁 record-management/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 staff-list/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📄 layout.tsx
│   │   │   └── 📄 page.tsx
│   │   ├── 📁 student/
│   │   │   ├── 📁 consultation/
│   │   │   │   ├── 📄 details-modal.tsx
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📁 medical-fitness/
│   │   │   │   └── 📄 page.tsx
│   │   │   ├── 📄 layout.tsx
│   │   │   ├── 📄 page.tsx
│   │   │   └── 📄 profile.tsx
│   │   └── 📄 layout.tsx
│   ├── 📁 notifications/
│   │   ├── 📁 screens/
│   │   │   └── 📄 index.tsx
│   │   └── 📄 page.tsx
│   ├── 📁 unauthorized/
│   │   └── 📄 page.tsx
│   ├── 🖼️ favicon.ico
│   ├── 🎨 globals.css
│   ├── 📄 layout.tsx
│   └── 📄 page.tsx
├── 📁 auth/
│   ├── 📄 auth-guard-2.tsx
│   ├── 📄 auth-guard.tsx
│   ├── 📄 role-based-auth-guard.tsx
│   ├── 📄 use-admin-validation.ts
│   ├── 📄 use-auth-page-redirect.tsx
│   └── 📄 use-auth.ts
├── 📁 axios/
│   ├── 📄 index.ts
│   └── 📄 make-api-request.ts
├── 📁 components/
│   ├── 📁 cards/
│   │   ├── 📄 card-account-details.tsx
│   │   ├── 📄 card-analytics-1.tsx
│   │   ├── 📄 card-analytics-2.tsx
│   │   ├── 📄 card-base.tsx
│   │   ├── 📄 card-content-progress.tsx
│   │   ├── 📄 card-horizontal.tsx
│   │   ├── 📄 cards-loading.tsx
│   │   └── 📄 menu-card.tsx
│   ├── 📁 layouts/
│   │   ├── 📁 auth/
│   │   │   ├── 📄 _auth-content-container.tsx
│   │   │   ├── 📄 _auth-title-caption.tsx
│   │   │   ├── 📄 _v1-auth-layout.tsx
│   │   │   ├── 📄 in-form-link.tsx
│   │   │   └── 📄 verify-account.tsx
│   │   ├── 📄 auth-header.tsx
│   │   ├── 📄 page-location-indicator.tsx
│   │   └── 📄 sidebar.tsx
│   ├── 📁 loaders/
│   │   ├── 📄 circular-upload-progress.tsx
│   │   ├── 📄 linear-upload-progress.tsx
│   │   ├── 🎨 loader-1.module.css
│   │   ├── 📄 loader-1.tsx
│   │   ├── 🎨 loader-2.module.css
│   │   ├── 📄 loader-2.tsx
│   │   └── 📄 loader-3.tsx
│   ├── 📁 magicui/
│   │   ├── 📄 blur-in.tsx
│   │   ├── 📄 fade-in.tsx
│   │   ├── 📄 letters-blur-in.tsx
│   │   ├── 📄 marquee.tsx
│   │   ├── 📄 number-ticker.tsx
│   │   ├── 📄 particles.tsx
│   │   ├── 📄 pull-up.tsx
│   │   ├── 📄 shimmer-button.tsx
│   │   ├── 📄 sparkles-text.tsx
│   │   ├── 📄 spring-image.tsx
│   │   ├── 📄 text-reveal.tsx
│   │   ├── 📄 typing-animation.tsx
│   │   ├── 📄 word-fade-in.tsx
│   │   ├── 📄 word-pull-up.tsx
│   │   └── 📄 word-rotate.tsx
│   ├── 📁 select-payment-option/
│   │   └── 📄 select-payment-options.tsx
│   ├── 📁 table/
│   │   ├── 📁 context/
│   │   │   └── 📄 TableBodyRowLinkProvider.tsx
│   │   ├── 📄 ExportData.js
│   │   ├── 📄 ReusableTable.tsx
│   │   ├── 📄 Table.tsx
│   │   ├── 📄 TableBody.tsx
│   │   ├── 📄 TableBodyCol.tsx
│   │   ├── 📄 TableBodyRow.tsx
│   │   ├── 📄 TableHead.tsx
│   │   ├── 📄 TableHeadCol.tsx
│   │   ├── 📄 TablePagination.tsx
│   │   ├── 📄 TablePagination2.tsx
│   │   ├── 📄 TableRow.tsx
│   │   ├── 📄 TableSearchActions.tsx
│   │   ├── 📄 auto-table-api.tsx
│   │   ├── 📄 useTableDataController.ts
│   │   └── 📄 useTableRouteApiSearchPagination.ts
│   ├── 📁 ui/
│   │   ├── 📄 accordion.tsx
│   │   ├── 📄 alert-dialog.tsx
│   │   ├── 📄 avatar.tsx
│   │   ├── 📄 badge.tsx
│   │   ├── 📄 button.tsx
│   │   ├── 📄 calendar.tsx
│   │   ├── 📄 card.tsx
│   │   ├── 📄 chart.tsx
│   │   ├── 📄 checkbox.tsx
│   │   ├── 📄 collapsible.tsx
│   │   ├── 📄 confetti.tsx
│   │   ├── 📄 dialog.tsx
│   │   ├── 📄 drawer.tsx
│   │   ├── 📄 dropdown-menu.tsx
│   │   ├── 📄 input-otp.tsx
│   │   ├── 📄 input.tsx
│   │   ├── 📄 label.tsx
│   │   ├── 📄 number-ticker.tsx
│   │   ├── 📄 pagination.tsx
│   │   ├── 📄 popover.tsx
│   │   ├── 📄 radio-group.tsx
│   │   ├── 📄 scroll-area.tsx
│   │   ├── 📄 select.tsx
│   │   ├── 📄 separator.tsx
│   │   ├── 📄 sheet.tsx
│   │   ├── 📄 sidebar.tsx
│   │   ├── 📄 skeleton.tsx
│   │   ├── 📄 switch.tsx
│   │   ├── 📄 table.tsx
│   │   ├── 📄 tabs.tsx
│   │   ├── 📄 textarea.tsx
│   │   ├── 📄 toast.tsx
│   │   ├── 📄 toaster.tsx
│   │   ├── 📄 tooltip.tsx
│   │   └── 📄 use-toast.ts
│   ├── 📄 DocumentPreview.tsx
│   ├── 📄 action-dropdown.tsx
│   ├── 📄 app-logo.tsx
│   ├── 📄 auto-analytics-api.tsx
│   ├── 📄 countdown-custom.tsx
│   ├── 📄 currency-amount.tsx
│   ├── 📄 date-formatter-to-text.tsx
│   ├── 📄 dialog-manager.tsx
│   ├── 📄 drawer-manager.tsx
│   ├── 📄 empty-state.tsx
│   ├── 📄 file-icon.tsx
│   ├── 📄 file-upload-handler.tsx
│   ├── 📄 flag-action.tsx
│   ├── 📄 form-builder.tsx
│   ├── 📄 go-back.tsx
│   ├── 📄 icons.tsx
│   ├── 📄 input-currency-amount.tsx
│   ├── 📄 input-currency-v1.tsx
│   ├── 📄 input-date-v1.tsx
│   ├── 📄 input-password-1.tsx
│   ├── 📄 input-phone-5.tsx
│   ├── 📄 input-search.tsx
│   ├── 📄 input-select-v1.tsx
│   ├── 📄 input-v1.tsx
│   ├── 📄 multiple-select-v1.tsx
│   ├── 📄 nested-analytics-api.tsx
│   ├── 📄 otp-input.tsx
│   ├── 📄 overlay-manager.tsx
│   ├── 📄 profile-image-helper.tsx
│   ├── 📄 profile-image-selector.tsx
│   ├── 📄 reusable-api-form.tsx
│   ├── 📄 reusable-upload-media.tsx
│   ├── 📄 search-filter.tsx
│   ├── 📄 select-pay-option.tsx
│   ├── 📄 smart-avatar.tsx
│   ├── 📄 tab-pill.tsx
│   ├── 📄 tab-underline.tsx
│   ├── 📄 text-area-v1.tsx
│   ├── 📄 title-caption-avatar.tsx
│   ├── 📄 title-caption-status-info.tsx
│   ├── 📄 title-caption.tsx
│   └── 📄 verification-control.tsx
├── 📁 const/
│   └── 📄 index.ts
├── 📁 data/
│   └── 📄 bank.json
├── 📁 hooks/
│   ├── 📄 useFileUpload.tsx
│   ├── 📄 useMobile.tsx
│   ├── 📄 useOverflowCheck.tsx
│   ├── 📄 usePagination.ts
│   ├── 📄 useUpdateQuerySearchParams.ts
│   ├── 📄 useUrlQueryState.tsx
│   ├── 📄 useUrlState.tsx
│   └── 📄 useUser.ts
├── 📁 lib/
│   ├── 📄 debounce.ts
│   ├── 📄 downloadFile.ts
│   ├── 📄 format-date.tsx
│   ├── 📄 formatBytes.ts
│   ├── 📄 formatNumbersWithCommas.tsx
│   ├── 📄 get-object-key-data.ts
│   ├── 📄 getFallbackBgClassFromKey.ts
│   ├── 📄 object-to-array-object.ts
│   ├── 📄 text.ts
│   └── 📄 utils.ts
├── 📁 node_modules/ 🚫 (auto-hidden)
├── 📁 public/
│   ├── 📁 images/
│   │   ├── 📄 allergies-icon.tsx
│   │   ├── 📄 dashboard-icon.tsx
│   │   ├── 🖼️ favicon.png
│   │   ├── 📄 folder-icon.tsx
│   │   ├── 🖼️ lasu-view.png
│   │   ├── 🖼️ origold.jpg
│   │   ├── 📄 pill-icon.tsx
│   │   ├── 📄 sparkling-separator.tsx
│   │   ├── 📄 student-group-icon.tsx
│   │   └── 📄 trend-up.tsx
│   ├── 📁 lottie/
│   │   ├── 📄 404-1.json
│   │   ├── 📄 check-mark-1.json
│   │   └── 📄 empty-1.json
│   ├── 🖼️ next.svg
│   └── 🖼️ vercel.svg
├── 📁 store/
│   ├── 📄 consultations.json
│   ├── 📄 department.json
│   └── 📄 students.json
├── 📁 swr/
│   ├── 📄 global-config.tsx
│   ├── 📄 index.ts
│   └── 📄 use-swr-data.ts
├── 📁 types/
│   ├── 📄 consultations.ts
│   ├── 📄 next-svgr.d.ts
│   └── 📄 students.ts
├── 📄 .env.local 🚫 (auto-hidden)
├── 📄 .eslintrc.json
├── 🚫 .gitignore
├── 📄 .hintrc
├── 📖 README.md
├── 📄 components.json
├── 📄 next-env.d.ts 🚫 (auto-hidden)
├── 📄 next.config.mjs
├── 📄 package.json
├── 📄 postcss.config.mjs
├── 📄 tailwind.config.ts
├── 📄 tsconfig.json
└── 🔒 yarn.lock
```

---

_Generated by FileTree Pro Extension_
