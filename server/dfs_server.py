import sys
import os

sys.path.append(os.path.abspath("grpc_proto"))




import grpc
import dfs_pb2
import dfs_pb2_grpc
from concurrent import futures

# Create a class for the DFS Service
class DFSServicer(dfs_pb2_grpc.DFSServiceServicer):
    
    def StoreChunk(self, request, context):
        print(f"Received chunk for file_id={request.file_id}, index={request.chunk_index}")
        # Simulate storing chunk (later, integrate with DB & disk storage)
        return dfs_pb2.StoreChunkResponse(success=True, message="Chunk stored successfully")

    def RetrieveChunk(self, request, context):
        print(f"Retrieving chunk for file_id={request.file_id}, index={request.chunk_index}")
        # Simulate chunk retrieval
        return dfs_pb2.RetrieveChunkResponse(success=True, chunk_data=b"dummy_data", message="Chunk retrieved")

    def ReplicateChunk(self, request, context):
        print(f"Replicating chunk for file_id={request.file_id}, index={request.chunk_index}, target_node={request.target_node_id}")
        # Simulate replication (later, implement actual logic)
        return dfs_pb2.ReplicateChunkResponse(success=True, message="Chunk replicated successfully")

# Start gRPC server
def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    dfs_pb2_grpc.add_DFSServiceServicer_to_server(DFSServicer(), server)
    server.add_insecure_port("[::]:50051")  # Server listens on port 50051
    server.start()
    print("DFS gRPC Server started on port 50051...")
    server.wait_for_termination()

if __name__ == "__main__":
    serve()
