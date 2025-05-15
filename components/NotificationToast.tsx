"use client"

export default function NotificationToast({ show, title, message, type = "info", onClose }) {
  if (!show) return null

  let iconColor, bgColor, progressColor

  switch (type) {
    case "success":
      iconColor = "text-green-500"
      bgColor = "bg-green-100"
      progressColor = "bg-green-500"
      break
    case "error":
      iconColor = "text-red-500"
      bgColor = "bg-red-100"
      progressColor = "bg-red-500"
      break
    default:
      iconColor = "text-blue-500"
      bgColor = "bg-blue-100"
      progressColor = "bg-blue-500"
  }

  return (
    <div className="fixed bottom-4 right-4 max-w-md bg-white rounded-lg shadow-xl overflow-hidden z-50 transform transition-all duration-500">
      <div className="flex items-center p-4">
        <div className={`flex-shrink-0 w-10 h-10 rounded-full ${bgColor} flex items-center justify-center mr-4`}>
          {type === "success" && (
            <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          )}
          {type === "error" && (
            <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          )}
          {type === "info" && (
            <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          )}
        </div>
        <div className="flex-grow">
          <h4 className="text-sm font-bold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
        <button onClick={onClose} className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <div
        className={`h-1 ${progressColor} w-full transform origin-left scale-x-100 transition-transform duration-3000`}
      ></div>
    </div>
  )
}
