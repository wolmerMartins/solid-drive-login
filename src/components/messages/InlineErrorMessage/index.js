import React from 'react'

import './style.css'

const InlineErrorMessage = ({ message = '' }) => (
  <div className="InlineErrorMessage">
    {message}
  </div>
)

export default InlineErrorMessage
