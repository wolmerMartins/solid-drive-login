import React, { useRef, useState } from 'react'

import Button from '../../buttons/Button'
import ConfirmButton from '../../buttons/ConfirmButton'

import DialogFooter from '../DialogFooter'

import { ACTION_KEY, COMPONENT_KEY, BACK_TEXT_KEY, BACK_ACTION_KEY } from './constants'

import './style.css'

const setNextStepAnimationStyle = element => {
  if (!element) return

  element.classList.remove('DialogContentSteps-hide')
  element.classList.add('DialogContentSteps-show')
}

const setHidePrevStepAnimationStyle = element => {
  if (!element) return

  element.classList.remove('DialogContentSteps-show')
  element.classList.add('DialogContentSteps-hide')
  element.style.animation = ''
}

const cleanReverseAnimationStyle = element => {
  if (element && element.classList.contains('reverse')) {
    element.classList.remove('reverse')
    element.style.animation = 'none'
  }
}

const setNextPrevStepAnimationStyle = element => {
  if (!element) return

  element.classList.remove('DialogContentSteps-show')
  element.classList.add('DialogContentSteps-hide')
}

const setHideNextStepAnimationStyle = element => {
  if (!element) return

  element.classList.add('DialogContentSteps-show', 'reverse')
  element.style.animation = ''
}

const cleanHideAnimationStyle = element => {
  if (!element) return

  element.classList.remove('DialogContentSteps-hide')
  element.style.animation = 'none'
}

const DialogContentSteps = ({
  steps = new Map(),
  footer = new Map(),
  actionLabel = 'Acessar'
}) => {
  const contentRef = useRef({});
  const [step, setStep] = useState(1)

  const action = steps.get(step).get(ACTION_KEY)
  const backText = steps.get(step).get(BACK_TEXT_KEY)
  const Component = steps.get(step).get(COMPONENT_KEY)
  const backAction = steps.get(step).get(BACK_ACTION_KEY)

  const setNextStepAnimation = () => {
    const { current: { content, footer } } = contentRef

    setNextStepAnimationStyle(content)
    setNextStepAnimationStyle(footer)

    return 290
  }

  const setHidePrevStepAnimation = () => {
    const { current: { content, footer } } = contentRef

    setHidePrevStepAnimationStyle(content)
    setHidePrevStepAnimationStyle(footer)

    return 250
  }

  const cleanReverseAnimation = () => {
    const { current: { content, footer } } = contentRef

    cleanReverseAnimationStyle(content)
    cleanReverseAnimationStyle(footer)

    return 10
  }

  const setNextStep = () => {
    let showDuration = 0
    const cleanUpDuration = cleanReverseAnimation()
    
    setTimeout(() => {
      const hideDuration = setHidePrevStepAnimation()

      setTimeout(() => {
        showDuration = setNextStepAnimation()

        setTimeout(() => {
          setStep(prevStep => prevStep + 1)
        }, showDuration)
      }, hideDuration)
    }, cleanUpDuration)
  }

  const setNextStepAction = async () => {
    if (!action) return setNextStep()

    const error = await action()

    if (!error) setNextStep()
  }

  const setNextPrevStepAnimation = () => {
    const { current: { content, footer } } = contentRef

    setNextPrevStepAnimationStyle(content)
    setNextPrevStepAnimationStyle(footer)
  }

  const setHideNextStepAnimation = () => {
    const { current: { content, footer } } = contentRef

    setHideNextStepAnimationStyle(content)
    setHideNextStepAnimationStyle(footer)

    return 800
  }

  const cleanHideAnimation = () => {
    const { current: { content, footer } } = contentRef

    cleanHideAnimationStyle(content)
    cleanHideAnimationStyle(footer)

    return 10
  }

  const setPrevStep = () => {
    if (backAction) backAction()

    const cleanUpDuration = cleanHideAnimation()

    setTimeout(() => {
      const animationDuration = setHideNextStepAnimation()

      setTimeout(() => {
        setStep(prevStep => prevStep - 1)
        setNextPrevStepAnimation()
      }, animationDuration)
    }, cleanUpDuration)
  }

  return (
    <>
      <main
        ref={el => contentRef.current.content = el}
        className="DialogContentSteps DialogContentSteps-show"
      >
        <div className="DialogContentSteps-header-area">
          {step > 1 &&
            <div className="DialogContentSteps-back-container">
              <Button
                onClick={setPrevStep}
                className="DialogContentSteps-back-button"
              >
                voltar
              </Button>
              {backText &&
                <span className="DialogContentSteps-back-text">
                  {backText}
                </span>
              }
            </div>
          }
        </div>
        {Component &&
          <div className="DialogContentSteps-content-area">
            {Component}
          </div>
        }
        <div className="DialogContentSteps-footer-area">
          {step === steps.size
            ? (
              <ConfirmButton onClick={action}>
                {actionLabel}
              </ConfirmButton>
            ) : (
              <Button onClick={setNextStepAction}>
                Próximo
              </Button>
            )
          }
        </div>
      </main>
      {Boolean(footer.size) &&
        <DialogFooter ref={contentRef}>
          {footer.get(step)}
        </DialogFooter>
      }
    </>
  )
}

export default DialogContentSteps
