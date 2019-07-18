import numpy as np

data = np.load('npz-csv/githubtrainingdatacompressed.npz')
for key, value in data.items():
    np.savetxt("p" + key + ".csv", value)