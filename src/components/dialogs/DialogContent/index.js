import React from 'react'

import './style.css'

const DialogContent = ({ children = null }) => (
  <main className="DialogContent DialogContent-show">
    {children}
  </main>
)

export default DialogContent
