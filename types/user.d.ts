// Copyright (c) 2023 QueLabs
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

export interface authData {
  id: string;
  username: string;
  name: string | null;
  avatar: string | null;
  avatarUrl: string | null;
  collectionId: string;
  collectionName: string;
  created: string;
  email: string | null;
  emailVisibility: boolean;
  updated: string;
  verified: boolean;
}
