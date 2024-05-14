import { User } from "@/interfaces"
import { UserTableItem } from "../user-table-item/UserTableItem";

interface Props {
    users: User[];
}
export const UsersTable = ({ users }: Props) => {
    return (
        <div className="mb-10">
            <table className="min-w-full">
                <thead className="bg-gray-200 border-b">
                    <tr>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            #ID
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Email
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Nombre completo
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                            Role
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user =>
                            <UserTableItem user={user} />
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
