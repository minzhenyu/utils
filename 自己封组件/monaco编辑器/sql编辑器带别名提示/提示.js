export const provideCompletionItems = async function (model, position) {
    const { lineNumber, column } = position
    // 光标前文本
    const textBeforePointer = model.getValueInRange({
        startLineNumber: lineNumber,
        startColumn: 0,
        endLineNumber: lineNumber,
        endColumn: column
    })
    const textBeforePointerMulti = model.getValueInRange({
        startLineNumber: 1,
        startColumn: 0,
        endLineNumber: lineNumber,
        endColumn: column
    })
    // 光标后文本
    // const textAfterPointer = model.getValueInRange({
    //   startLineNumber: lineNumber,
    //   startColumn: column,
    //   endLineNumber: lineNumber,
    //   endColumn: model.getLineMaxColumn(model.getLineCount())
    // })
    const textAfterPointerMulti = model.getValueInRange({
        startLineNumber: lineNumber,
        startColumn: column,
        endLineNumber: model.getLineCount(),
        endColumn: model.getLineMaxColumn(model.getLineCount())
    })
    // const nextTokens = textAfterPointer.trim().split(/\s+/)
    // const nextToken = nextTokens[0].toLowerCase()
    const tokens = textBeforePointer.trim().split(/\s+/)
    const lastToken = tokens[tokens.length - 1].toLowerCase()
    // 数据库名联想
    if (lastToken === 'database') {
        return {
            suggestions: this.getDataBaseSuggest()
        }
        // <库名>.<表名> || <别名>.<字段>
    } else if (lastToken.endsWith('.')) {
        // 去掉点后的字符串
        const tokenNoDot = lastToken.slice(0, lastToken.length - 1)
        if (this.dbSchema.find((db) => db.dbName === tokenNoDot.replace(/^.*,/g, ''))) {
            // <库名>.<表名>联想
            return {
                suggestions: [...this.getTableSuggestByDbName(tokenNoDot.replace(/^.*,/g, ''))]
            }
        } else if (
            this.getTableNameAndTableAlia(
                textBeforePointerMulti.split(';')[textBeforePointerMulti.split(';').length - 1] + textAfterPointerMulti.split(';')[0]
            )
        ) {
            const tableInfoList = this.getTableNameAndTableAlia(
                textBeforePointerMulti.split(';')[textBeforePointerMulti.split(';').length - 1] + textAfterPointerMulti.split(';')[0]
            )
            const currentTable = tableInfoList.find((item) => item.tableAlia === tokenNoDot.replace(/^.*,/g, ''))
            // <别名>.<字段>联想
            if (currentTable && currentTable.tableName) {
                return {
                    suggestions: await this.getTableColumnSuggestByTableAlia(currentTable.tableName)
                }
            } else {
                return {
                    suggestions: []
                }
            }
        } else {
            return {
                suggestions: []
            }
        }
        // 库名联想
    } else if (
        lastToken === 'from' ||
        lastToken === 'join' ||
        /(from|join)\s+.*?\s?,\s*$/.test(textBeforePointer.replace(/.*?(/gm, '').toLowerCase())
    ) {
        // const tables = this.getTableSuggest()
        const databases = this.getDataBaseSuggest()
        return {
            suggestions: databases
        }
        // 字段联想
    } else if (
        ['select', 'where', 'order by', 'group by', 'by', 'and', 'or', 'having', 'distinct', 'on'].includes(lastToken.replace(/.*?(/g, '')) ||
        (lastToken.endsWith('.') && !this.dbSchema.find((db) => `${db.dbName}.` === lastToken)) ||
        /(select|where|order by|group by|by|and|or|having|distinct|on)\s+.*?\s?,\s*$/.test(textBeforePointer.toLowerCase())
    ) {
        return {
            suggestions: await this.getTableColumnSuggest()
        }
        // 自定义字段联想
    } else if (this.customKeywords.toString().includes(lastToken)) {
        return {
            suggestions: this.getCustomSuggest(lastToken.startsWith('$'))
        }
        // 默认联想
    } else {
        return {
            suggestions: [...this.getDataBaseSuggest(), ...this.getTableSuggest(), ...this.getKeywordSuggest()]
        }
    }
}

// ＊获展sql中所有的表名和别名

// ＊＠param（＊）sqLText SQL字符质
const getTableNameAndTableAlia = function (sqlText) {
    const regTableAliaFrom = /(^|(\s+))from\s+([^\s]+(\s+|(\s+as\s+))[^\s]+(\s+|,)\s*)+(\s+(where|left|right|full|join|inner|union))?/gi
    const regtableAliaJoin = /(^|(\s+))join\s+([^\s]+)\s+(as\s+)?([^\s]+)\s+on/gi

    const regTableAliaFromList = sqlText.match(regTableAliaFrom) ? sqlText.match(regTableAliaFrom) : []
    const regTableAliaJoinList = sqlText.match(regtableAliaJoin) ? sqlText.match(regtableAliaJoin) : []
    const strList = [
        ...regTableAliaFromList.map((item) =>
            item
                .replace(/(^|(\s+))from\s+/gi, '')
                .replace(/\s+(where|left|right|full|join|inner|union)((\s+.*?$)|$)/gi, '')
                .replace(/\s+as\s+/gi, ' ')
                .trim()
        ),
        ...regTableAliaJoinList.map((item) =>
            item
                .replace(/(^|(\s+))join\s+/gi, '')
                .replace(/\s+on((\s+.*?$)|$)/, '')
                .replace(/\s+as\s+/gi, ' ')
                .trim()
        )
    ]
    const tableList = []
    strList.map((tableAndAlia) => {
        tableAndAlia.split(',').forEach((item) => {
            const tableName = item.trim().split(/\s+/)[0]
            const tableAlia = item.trim().split(/\s+/)[1]
            tableList.push({
                tableName,
                tableAlia
            })
        })
    })
    return tableList
}
