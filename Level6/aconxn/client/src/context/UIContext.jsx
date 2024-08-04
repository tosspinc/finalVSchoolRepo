import React, { createContext, useState, useContext } from 'react'

//creates context for UI state
export const UIContext = createContext()

export function UIProvider({children}) {
    const [showIssueForm, setShowIssueForm] = useState(false)

    const openIssueForm = () => setShowIssueForm(true)
    const closeIssueForm = () => setShowIssueForm(false)

    return (
        <UIContext.Provider value={{ showIssueForm, openIssueForm, closeIssueForm }}>
            {children}
        </UIContext.Provider>
    )
}

export function useUIContext() {
    return useContext(UIContext)
}