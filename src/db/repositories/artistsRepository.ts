/*

Prepare statement 로, 
각 펑션 자체적으로 finalizeAsync 까지 원스탑으로 완성해준다.


*/

import { useSQLiteContext } from 'expo-sqlite' 

export const useArtistsRepository = () => {
    const db = useSQLiteContext()

    async function totalCnt() {
        try{
            const statement = await db.prepareAsync(`
                SELECT COUNT(*) AS total FROM artists;
            `)

            const result = await statement.executeAsync()
            console.log(result)
            const row = await result.getFirstAsync()
            await statement.finalizeAsync()
            if (row && typeof row === 'object' && 'total' in row) {
                return row.total as number
            }
            return 0
        } catch(e) {
            console.error(e)
            return 0
        } finally {
            // db.closeSync()
        }
    }

    function selectRange(start: number, end: number) {
        //
    }

    async function selectById(id: number) {
        try{
            const statement = await db.prepareAsync(`
                SELECT * FROM artists
                WHERE id = $id;
            `)

            const result = await statement.executeAsync({ $id: id })
            await statement.finalizeAsync()
            return result.getFirstAsync()
        } catch(e) {
            console.error(e)
            throw e
        } finally {
            // db.closeSync()
        }
    }

    async function insert(artist: any) {
        try {
            const statement = await db.prepareAsync(`
                INSERT INTO artists (id, name, country, type, disambiguation, begin_date, end_date)
                VALUES ($id, $name, $country, $type, $disambiguation, $begin_date, $end_date); 
            `)

            await statement.executeAsync({
                $id: artist.id,
                $name: artist.name,
                $country: artist.country,
                $type: artist.type,
                $disambiguation: artist.disambiguation,
                $begin_date: artist['life-span']?.begin,
                $end_date: artist['life-span']?.end
            })

            await statement.finalizeAsync()
        } catch(e) {
            console.error(e)
            throw e
        }
    }

    async function deleteById(id: number) {
        try{
            const statement = await db.prepareAsync(`
                DELETE FROM artists
                WHERE id = $id;
            `);

            await statement.executeAsync({ $id: id });
            await statement.finalizeAsync()
        } catch(e) {
            console.error(e)
            throw e
        } finally {
            // db.closeAsync()
        }
    }

    return { totalCnt, selectRange, selectById, insert, deleteById }
}
