import cors from 'cors'

//origfenes permitidos para la api
const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:5173',
]


export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 🔥 Agregar PUT
})