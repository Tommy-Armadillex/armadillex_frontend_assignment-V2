import { boot } from 'quasar/wrappers'
import LucideIcon from 'src/components/common/LucideIcon.vue'
import BasicError from 'src/components/common/BasicError.vue'
import BasicLoader from 'src/components/common/BasicLoader.vue'
import BasicNoData from 'src/components/common/BasicNoData.vue'
import CompanyAvatar from 'src/components/common/CompanyAvatar.vue'

/**
 * Register global components
 * These components are available in all Vue components without importing
 */
export default boot(({ app }) => {
  // Register LucideIcon globally as 'lucide-icon'
  app.component('LucideIcon', LucideIcon)

  // Register common components globally
  app.component('BasicError', BasicError)
  app.component('BasicLoader', BasicLoader)
  app.component('BasicNoData', BasicNoData)
  app.component('CompanyAvatar', CompanyAvatar)

  // You can also use it with different casing:
  // <LucideIcon /> or <lucide-icon />
})
