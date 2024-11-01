"use server";
import { ApiError } from "@/services/api-sdk/errors";
import { fetchService } from "@/services/api-sdk/init";
import { formatDate } from "@/services/api-sdk/lib/utils";
/**
 * Fetches all evaluation for a user profile from the server.
 * @returns A promise that resolves to the evaluation.
 * @throws {ApiError} if the request fails.
 */
export const getAllEvaluations = async () => {
  const response = await fetchService.get("/notations");
  if (response.ok) {
    const data = await response.json();
    return data.data
      .map((item) => {
        try {
          return {
            id: item.id,
            reference: item.evaluation_reference,
            originalGlobalScore: item.original_note,
            originalStatus: item.original_status,
            currentGlobalScore: item.last_note,
            currentStatus: item.last_status,
            createdBy: item.creator,
            collaborator: {
              id: item.collaborator.id,
              firstname: item.collaborator.firstname,
              lastname: item.collaborator.lastname,
              profile: item.collaborator.position,
            },
            originalScores: item.original_indicators.map((score) => ({
              score: score.note,
              criteria: {
                id: score.performance_indicator.id,
                title: score.performance_indicator.title,
                type: score.performance_indicator.type,
                maxScore: score.performance_indicator.note,
              },
            })),
            currentScores: item.last_indicators.map((score) => ({
              score: score.note,
              criteria: {
                id: score.performance_indicator.id,
                title: score.performance_indicator.title,
                type: score.performance_indicator.type,
                maxScore: score.performance_indicator.note,
              },
            })),
          };
        } catch (e) {
          return null;
        }
      })
      .filter((evaluation) => evaluation !== null);
  }
  throw new ApiError("Failed to fetch the evaluation");
};
/**
 * Fetches a single evaluation from the server.
 * @param evaluationId - The id of the evaluation.
 * @returns A promise that resolves to the evaluation.
 * @throws {ApiError} if the request fails.
 */
export const getOneEvaluation = async (evaluationId) => {
  const response = await fetchService.get(`/notations/${evaluationId}`);
  if (response.ok) {
    const { data: item } = await response.json();
    return {
      id: item.id,
      reference: item.evaluation_reference,
      originalGlobalScore: item.original_note,
      originalStatus: item.original_status,
      currentGlobalScore: item.last_note,
      currentStatus: item.last_status,
      createdBy: item.creator,
      collaborator: {
        id: item.collaborator.id,
        firstname: item.collaborator.firstname,
        lastname: item.collaborator.lastname,
        profile: item.collaborator.position,
      },
      originalScores: item.original_indicators.map((score) => ({
        score: score.note,
        criteria: {
          id: score.performance_indicator.id,
          title: score.performance_indicator.title,
          type: score.performance_indicator.type,
          maxScore: score.performance_indicator.note,
        },
      })),
      currentScores: item.last_indicators.map((score) => ({
        score: score.note,
        criteria: {
          id: score.performance_indicator.id,
          title: score.performance_indicator.title,
          type: score.performance_indicator.type,
          maxScore: score.performance_indicator.note,
        },
      })),
      forwards: item.transfers?.map((transfer) => ({
        id: transfer.id,
        title: transfer.title,
        dueDate: new Date(transfer.deadline),
        description: transfer.description,
        completed: transfer.status,
        globalScore: transfer.notation.note,
        scores: transfer.notation.indicators.map((score) => ({
          score: score.note,
          criteria: {
            id: score.performance_indicator.id,
            title: score.performance_indicator.title,
            type: score.performance_indicator.type,
            maxScore: score.performance_indicator.note,
          },
        })),
        sender: {
          id: transfer.sender.id,
          firstname: transfer.sender.firstname,
          lastname: transfer.sender.lastname,
          email: transfer.sender.email,
        },
        receiver: {
          id: transfer.collaborators[0].id,
          firstname: transfer.collaborators[0].firstname,
          lastname: transfer.collaborators[0].lastname,
          email: transfer.collaborators[0].email,
        },
      })),
    };
  }
  throw new ApiError("Failed to fetch the evaluation");
};
/**
 * Creates a new evaluation.
 * @param args - The form data to create the evaluation.
 * @returns The created evaluation.
 * @throws {ApiError} if the request fails.
 */
export const createEvaluation = async (args) => {
  const response = await fetchService.post(
    "/notations",
    JSON.stringify({
      status: args.isArchived ? "archived" : undefined,
      collaborator_id: args.collaboratorId,
      notes: args.scores.map((score) => ({
        performance_indicator_id: score.criteriaId,
        note: score.score,
      })),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to create the evaluation");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    reference: item.evaluation_reference,
    originalGlobalScore: item.original_note,
    originalStatus: item.original_status,
    currentGlobalScore: item.last_note,
    currentStatus: item.last_status,
    createdBy: item.creator,
    collaborator: {
      id: item.collaborator.id,
      firstname: item.collaborator.firstname,
      lastname: item.collaborator.lastname,
      profile: item.collaborator.position,
    },
    originalScores: item.original_indicators.map((score) => ({
      score: score.note,
      criteria: {
        id: score.performance_indicator.id,
        title: score.performance_indicator.title,
        type: score.performance_indicator.type,
        maxScore: score.performance_indicator.note,
      },
    })),
    currentScores: item.last_indicators.map((score) => ({
      score: score.note,
      criteria: {
        id: score.performance_indicator.id,
        title: score.performance_indicator.title,
        type: score.performance_indicator.type,
        maxScore: score.performance_indicator.note,
      },
    })),
  };
};
/**
 * Updates a new evaluation.
 * @param evaluationId - The id of the evaluation.
 * @param args - The form data to update the evaluation.
 * @returns The updated evaluation.
 * @throws {ApiError} if the request fails.
 */
export const updateEvaluation = async (evaluationId, args) => {
  const response = await fetchService.put(
    `/notations/${evaluationId}`,
    JSON.stringify({
      notes: args.scores.map((score) => ({
        performance_indicator_id: score.criteriaId,
        note: score.score,
      })),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to update the evaluation");
  }
  const { data: item } = await response.json();
  return {
    id: item.id,
    reference: item.evaluation_reference,
    originalGlobalScore: item.original_note,
    originalStatus: item.original_status,
    currentGlobalScore: item.last_note,
    currentStatus: item.last_status,
    createdBy: item.creator,
    collaborator: {
      id: item.collaborator.id,
      firstname: item.collaborator.firstname,
      lastname: item.collaborator.lastname,
      profile: item.collaborator.position,
    },
    originalScores: item.original_indicators.map((score) => ({
      score: score.note,
      criteria: {
        id: score.performance_indicator.id,
        title: score.performance_indicator.title,
        type: score.performance_indicator.type,
        maxScore: score.performance_indicator.note,
      },
    })),
    currentScores: item.last_indicators.map((score) => ({
      score: score.note,
      criteria: {
        id: score.performance_indicator.id,
        title: score.performance_indicator.title,
        type: score.performance_indicator.type,
        maxScore: score.performance_indicator.note,
      },
    })),
  };
};
/**
 * Forwards an evaluation.
 * @param evaluationId - The id of the evaluation.
 * @param args - The form data to forward the evaluation.
 * @returns The forwarded evaluation.
 * @throws {ApiError} if the request fails.
 */
export const forwardEvaluation = async (evaluationId, args) => {
  const response = await fetchService.post(
    "/evaluation_create_transfers",
    JSON.stringify({
      notation_id: evaluationId,
      forward_title: args.title,
      deadline_transfer: formatDate(args.dueDate),
      description: args.description,
      collaborators: [args.receiverId],
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to forward the evaluation");
  }
};
/**
 * Completes an evaluation transfer.
 * @param evaluationId - The id of the evaluation.
 * @param args - The form data to complete the evaluation.
 * @returns The completed evaluation.
 * @throws {ApiError} if the request fails.
 */
export const completeEvaluation = async (evaluationId, args) => {
  const response = await fetchService.post(
    "/complete_transfers",
    JSON.stringify({
      type: "evaluation",
      transfer_id: args.transferId,
      notes: args.scores.map((score) => ({
        performance_indicator_id: score.criteriaId,
        note: score.score,
      })),
    }),
    { headers: { "Content-Type": "application/json" } },
  );
  if (!response.ok) {
    throw new ApiError("Failed to complete the evaluation");
  }
};
/**
 * Prints an evaluation.
 * @param evaluationId - The id of the evaluation.
 * @throws {ApiError} if the request fails.
 */
export const printEvaluation = async (evaluationId) => {
  const response = await fetchService.get(
    `/generate_pdf_fiche_suivi_evaluation?notation_id=${evaluationId}`,
  );
  if (!response.ok) {
    throw new ApiError("Failed to print the evaluation");
  }
  const buffer = Array.from(new Uint8Array(await response.arrayBuffer()));
  const filename =
    response.headers
      .get("Content-Disposition")
      ?.match(/filename="(.+)"/)?.[1] ?? "evaluation.pdf";
  return {
    buffer,
    filename,
  };
};
