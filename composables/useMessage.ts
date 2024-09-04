import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

export const useMessage = () => {
    return {
        // 消息提示
        info(content: string) {
            ElMessage.info(content)
        },
        // 错误消息
        error(content: string) {
            ElMessage.error(content)
        },
        // 成功消息
        success(content: string) {
            ElMessage.success(content)
        },
        // 警告消息
        warning(content: string) {
            ElMessage.warning(content)
        },
        // 弹出提示
        alert(content: string) {
            ElMessageBox.alert(content, 'common.confirmTitle')
        },
        // 错误提示
        alertError(content: string) {
            ElMessageBox.alert(content, 'common.confirmTitle', { type: 'error' })
        },
        // 成功提示
        alertSuccess(content: string) {
            ElMessageBox.alert(content, 'common.confirmTitle', { type: 'success' })
        },
        // 警告提示
        alertWarning(content: string) {
            ElMessageBox.alert(content, 'common.confirmTitle', { type: 'warning' })
        },
        // 通知提示
        notify(content: string) {
            ElNotification.info(content)
        },
        // 错误通知
        notifyError(content: string) {
            ElNotification.error(content)
        },
        // 成功通知
        notifySuccess(content: string) {
            ElNotification.success(content)
        },
        // 警告通知
        notifyWarning(content: string) {
            ElNotification.warning(content)
        },
        // 确认窗体
        confirm(content: string, tip?: string) {
            return ElMessageBox.confirm(content, tip ? tip : 'common.confirmTitle', {
                confirmButtonText: 'common.ok',
                cancelButtonText: 'common.cancel',
                type: 'warning'
            })
        },
    }
}
