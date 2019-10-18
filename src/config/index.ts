/** @format */

import * as devConfig from './development'
import * as proConfig from './production'

const config = process.env.NODE_ENV === 'development' ? devConfig : proConfig

export default config
