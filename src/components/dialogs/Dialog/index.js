import React from 'react'

import './style.css'

const Dialog = ({
  open = false,
  children = null,
}) => (
  <>
    {open &&
      <div className="Dialog-overlay"></div>
    }
    <dialog
      open={open}
      className="Dialog"
    >
      {children}
    </dialog>
  </>
)

export default Dialog
