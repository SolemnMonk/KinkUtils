#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

menusToShow=26
shootsToDownload=26

OpenShoots() {
	Send, {Down}{Down}{Down}
	Sleep, 250
	MouseMove, 115, 215, 0
	Sleep, 100
	Send, {Ctrl down}
	Sleep, 100
	MouseClick, Left,,,,,D
	Sleep, 100
	Send, {Ctrl up}
	Sleep, 100
	MouseMove, 1250, 725, 100
	Sleep, 100
	MouseClick, Left,,,,,U
	Sleep, 250
	Send, {Down}{Down}{Down}
	Sleep, 100
	MouseMove, 115, 215, 0
	Sleep, 100
	MouseClick, Left, 275, 700
	Sleep, 800
	return
}

ShowMenus() {
	MouseMove, 650, 475, 0
	Sleep, 50
	Send, {Down}{Down}{Down}{Down}
	Sleep, 700
	MouseClick
	Sleep, 200
}

ClickDownload() {
	MouseMove, 600, 600, 0
	Sleep, 100
	MouseClick, Right
	Sleep, 300
	Send, o
	Sleep, 600
}

NextTab() {
	Send {Ctrl down}{Tab}{Ctrl up}
	Sleep, 500
}

^+Up::
	WinSet, AlwaysOnTop, On, A
	return

^+Down::
	WinSet, AlwaysOnTop, Off, A

; Open the shoots on the current page and move to the next page
^1::
	OpenShoots()
	return

; Open the download menu on the current page
^2::
	ShowMenus()
	return

; Open the download menu for the active tabs
^!2::
	Sleep, 1000
	Loop, %menusToShow% {
		ShowMenus()
		NextTab()
		Sleep 50
	}
	return

; Right click the download link and active DTA 1Click
^3::
	ClickDownload()
	return

; Right click the download link and active DTA 1Click for the active tabs
^!3::
	Sleep, 1000
	Loop, %shootsToDownload% {
		ClickDownload()
		NextTab()
	}

^r::reload