'use client'

import { changeUserRol } from "@/actions";
import { User } from "@/interfaces"

interface Props {
  user: User;
}
export const UserTableItem = ({ user }: Props) => {
  return (
    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {user.id.split('-').at(-1)}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {user.email}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        {user.name}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        <select className="text-sm text-gray-900 w-full p-2" value={user.role} onChange={e => changeUserRol(user.id, e.target.value)}>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </td>
    </tr>
  )
}
