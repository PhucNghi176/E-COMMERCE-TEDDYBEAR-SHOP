import { mediaService } from "@/services/mediaService";
import { useMutation } from '@tanstack/react-query';

export const useMedia = () => {
    return useMutation({
        mutationFn: (image: File) => mediaService.uploadImage(image),
    });
}