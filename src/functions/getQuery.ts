type Column = {
    databaseColumnName: string
    usedInQuery: boolean
}

export default function getQuery(columns: Column[], noNull: boolean) {

    let columnList = '';

    for (let i = 0; i < columns.length; i++) {
        if (columns[i].usedInQuery) {
            columnList += columns[i].databaseColumnName;
            columnList += ',';
        }
    }
    columnList = columnList.substring(0, columnList.length - 1);

    let query = `select+distinct+${columnList}+from+ps`;

    if (noNull) {
        let whereClause = '+where+';
        for (let i = 0; i < columns.length; i++) {
            if (columns[i].usedInQuery) {
                whereClause += columns[i].databaseColumnName + '+is+not+null';
                whereClause += '+and+';
            }
        }
        whereClause = whereClause.substring(0, whereClause.length - 5);
        query += whereClause;
    }

    return query;
}