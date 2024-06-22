const defaults = {}
import { mxCardPost } from '/src/js/mixins/index.js';
import { header, content, media, quotes, link, pagination, footer } from './shared.js';
export default function (data) {
    return {
        // mixins
        ...mxCardPost(data),
        // properties
        html: '',
        init() {
            this.item = data.item;
            this._mxCardPost_init();
            const self = this;
            this.load(this.data)
        },
        get selectedPost() {
            return this.item;
            return this.mxCardPost_thread[this.currentPage] || {}
        },
        get totalAgrees() {
            return this.mxCardPost_thread.reduce((sum, item) => sum + item.agrees, 0);
        },
        get totalDisagrees() {
            return this.mxCardPost_thread.reduce((sum, item) => sum + item.disagrees, 0);
        },
        get totalReplies() {
            return this.mxCardPost_thread.reduce((sum, item) => sum + item.replies, 0);
        },
        get totalLikes() {
            return this.mxCardPost_thread.reduce((sum, item) => sum + item.likes, 0);
        },
        get quotedPosts() {
            if (this.selectedPost == null || this.selectedPost.quotedPosts == null) return [];
            return this.selectedPost.quotedPosts;
        },
        load(data) {
            const html = `
            <article class="dense padless" :class="articleClass" :id="selectedPost.threadId">
               
                ${header()}
                <div class="content">
                    ${content()}
                </div>
                ${media()}
                     
                ${quotes()}  

                ${pagination()}

                ${link()}  
                    
                ${footer()}
               
            </article>
        `
            this.html = html;
            this.$nextTick(() => {
                this.$root.innerHTML = html
            });
        },
    }
}