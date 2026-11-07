"use client"
// Keeps focus in the input so the list doesn't close before the click lands

import { useEffect, useRef, useState } from "react"

interface StateSelectorProps {
  id: string
  options: string[]
  value: string
  onChange: (name: string) => void
  // Optional extras for use inside a form
  name?: string
  placeholder?: string
  required?: boolean
  invalid?: boolean
  describedBy?: string
  // false makes it a plain pick-from-the-list menu: no typing, nothing to filter
  searchable?: boolean
}

export function StateSelector({
  id,
  options,
  value,
  onChange,
  name,
  placeholder,
  required,
  invalid,
  describedBy,
  searchable = true,
}: StateSelectorProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)
  const activeRef = useRef<HTMLLIElement>(null)
  const listId = `${id}-list`
  const needle = searchable ? query.trim().toLowerCase() : ""
  const shown = options.filter((name) => name.toLowerCase().includes(needle))

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest" })
  }, [active, open])

  const openList = () => {
    if (open) return
    setQuery("")
    setActive(Math.max(0, options.indexOf(value)))
    setOpen(true)
  }

  const choose = (name: string) => {
    onChange(name)
    setOpen(false)
  }

  return (
    <div
      className={open ? "stateSelect open" : "stateSelect"}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}
    >
      {name && <input type="hidden" name={name} value={value} />}
      <input
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={
          open &&
          shown[active]
            ? `${id}-opt-${active}`
            : undefined
        }
        // Chrome ignores "off" on state-like fields and shows saved addresses, so use a value it does not recognise
        autoComplete="nope"
        readOnly={!searchable}
        value={open && searchable ? query : value}
        placeholder={value || placeholder}
        required={required}
        aria-required={required}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={openList}
        onChange={(event) => {
          setQuery(event.target.value)
          setActive(0)
          setOpen(true)
        }}
        onKeyDown={(event) => {
          if (
            event.key ===
            "ArrowDown"
          ) {
            event.preventDefault()
            if (open)
              setActive((i) =>
                Math.min(
                  i +
                    1,
                  shown.length -
                    1,
                ),
              )
            else openList()
          } else if (
            event.key ===
            "ArrowUp"
          ) {
            event.preventDefault()
            setActive((i) =>
              Math.max(
                i -
                  1,
                0,
              ),
            )
          } else if (
            event.key ===
              "Enter" &&
            open &&
            shown[active]
          ) {
            event.preventDefault()
            choose(shown[active])
          } else if (
            event.key ===
            "Escape"
          ) {
            setOpen(false)
          }
        }}
      />
      {open && (
        <ul id={listId} className="stateList" role="listbox">
          {shown.map((name, i) => (
            <li
              key={name}
              id={`${id}-opt-${i}`}
              ref={
                i ===
                active
                  ? activeRef
                  : undefined
              }
              role="option"
              aria-selected={
                name ===
                value
              }
              className={
                i ===
                active
                  ? "active"
                  : undefined
              }
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => choose(name)}
            >
              {name}
            </li>
          ))}
          {shown.length === 0 && <li className="empty">No state found</li>}
        </ul>
      )}
    </div>
  )
}
