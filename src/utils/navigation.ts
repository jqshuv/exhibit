// Copyright (c) 2023 QueLabs
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT


export default function navigation(currentSite?: string) {
  return [
    { name: 'Home', href: currentSite === 'home' ? '#' : '/', current: currentSite === 'home' },
    { name: 'Team', href: '#', current: currentSite === 'team' },
    { name: 'Projects', href: '#', current: currentSite === 'projects' },
    { name: 'Calendar', href: '#', current: currentSite === 'calendar' },
  ]
}

