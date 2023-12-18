import { EventEmitter } from "../EventEmitter";

export class TodoListModel extends EventEmitter {
    #items;
    /**
     * @param {TodoItemModel[]} [item] 初期アイテム一覧(デフォルトは空の配列)
     */
    constructor(items = []) {
        super();
        this.#items = items;
    }


    /**
     * TodoItemの合計個数を返す
     * @returns {number}
     */
    getTotalCount() {
        return this.#items.length;
    }

    /**
     * 
     */
}