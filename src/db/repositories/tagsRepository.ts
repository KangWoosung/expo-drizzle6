import { useSQLiteContext } from 'expo-sqlite' 

export const useTagsRepository = () => {
    const db = useSQLiteContext()

    function totalCnt() {
        const statement = db.prepareSync(`
            SELECT COUNT(*) AS total FROM tags;
        `)

        const result = statement.executeSync()
        const row = result.getFirstSync()
        if (row && typeof row === 'object' && 'total' in row) {
            return row.total as number
        }
        return 0
    }

    function selectById(id: number) {
        const statement = db.prepareSync(`
            SELECT * FROM tags
            WHERE id = $id;
        `)

        const result = statement.executeSync({ $id: id })
        return result.getFirstSync()
    }

    function selectByName(name: string) {
        const statement = db.prepareSync(`
            SELECT * FROM tags
            WHERE name = $name;
        `)

        const result = statement.executeSync({ $name: name })
        return result.getFirstSync()
    }

    async function insert(name: string) {
        const statement = db.prepareSync(`
            INSERT INTO tags (name)
            VALUES ($name);
        `)

        return statement.executeAsync({
            $name: name,
        })
    }

    async function deleteById(id: number) {
        const statement = db.prepareSync(`
            DELETE FROM tags
            WHERE id = $id;
        `)

        statement.executeAsync({ $id: id })
    }

    return { 
        totalCnt, 
        selectById, 
        selectByName, 
        insert, 
        deleteById 
    }
}