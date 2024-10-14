// Copyright (c) 2023 QueLabs
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export default function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
