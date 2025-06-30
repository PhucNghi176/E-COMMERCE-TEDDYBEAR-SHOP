import { SearchParamsPaginated, CreateTeddyBearRequest, UpdateTeddyBearRequest } from "@/types";
import { useFetch } from "./useAPiCall";
import { teddyBearService } from "@/services/teddyBearService";
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useTeddyBears = (searchParams: SearchParamsPaginated) => {
    // Create a cleaned version of searchParams
    const cleanedParams = {
        ...searchParams,
        searchTerm: searchParams.searchTerm?.trim() || ''
    };

    return useFetch(['teddybears', cleanedParams], () => teddyBearService.getTeddyBears(cleanedParams));
};

export const useTeddyBear = (id: string) => {
    return useFetch(['teddybear', id], () => teddyBearService.getTeddyBearById(id));
};

export const useCreateTeddyBear = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (teddyBearData: CreateTeddyBearRequest) =>
            teddyBearService.createTeddyBear(teddyBearData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['teddybears'] });
        },
    });
};

export const useUpdateTeddyBear = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (teddyBearData: UpdateTeddyBearRequest) =>
            teddyBearService.updateTeddyBear(teddyBearData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['teddybears'] });
            queryClient.invalidateQueries({ queryKey: ['teddybear', data.id] });
        },
    });
};

export const useDeleteTeddyBear = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => teddyBearService.deleteTeddyBear(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['teddybears'] });
        },
    });
}; 